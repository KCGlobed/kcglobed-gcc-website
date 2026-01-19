import { query } from '../utils/db';
import { uploadToGCS } from '../utils/gcs';
import { readMultipartFormData, createError } from 'h3';

export default defineEventHandler(async (event) => {
    // Check if the request is multipart
    const contentType = getHeader(event, 'content-type');
    if (!contentType?.includes('multipart/form-data')) {
        // Fallback to JSON body if not multipart (for initial registration maybe?)
        // But for the full form we expect multipart.
        // Let's keep the old logic as a fallback if body is JSON, but mostly we expect multipart now.
        try {
            const body = await readBody(event);
            // ... existing simple logic could go here if needed, but we will focus on the full update
            if (body && body.email) {
                // Simple registration path
                const { email } = body;
                const check = await query('SELECT * FROM users WHERE email = $1', [email]);
                if ((check.rowCount ?? 0) > 0) {
                    throw createError({ statusCode: 400, statusMessage: 'User already exists' });
                }
                const insert = await query('INSERT INTO users (email) VALUES ($1) RETURNING id', [email]);
                return { insertId: insert.rows[0].id };
            }
        } catch (e) {
            // ignore JSON parse error if it's strictly multipart
        }
    }

    const parts = await readMultipartFormData(event);
    if (!parts) {
        throw createError({ statusCode: 400, statusMessage: 'No data provided' });
    }

    const formData: Record<string, any> = {};
    const files: Record<string, any> = {};

    // Process parts
    for (const part of parts) {
        if (part.filename) {
            // It's a file
            files[part.name!] = {
                filename: part.filename,
                type: part.type,
                data: part.data
            };
        } else {
            // It's a field
            formData[part.name!] = part.data.toString();
        }
    }

    const { email } = formData;
    if (!email) {
        throw createError({ statusCode: 400, statusMessage: 'Email is required for identification' });
    }

    // Upload files to GCS
    const documentUrls: Record<string, string> = {};
    for (const [fieldName, file] of Object.entries(files)) {
        const uniqueFilename = `${Date.now()}-${file.filename}`;
        const url = await uploadToGCS(file.data, uniqueFilename, file.type);
        documentUrls[fieldName] = url;
    }

    // Merge new document URLs with existing ones might be needed, but we'll specific implementation:
    // We will store all document URLs in the `document_urls` JSONB column.
    // If we want to append, we would need to fetch first. For now, let's assume we overwrite or merge in JS.

    // Prepare DB update
    // We need to check if user exists first
    const userResult = await query('SELECT * FROM users WHERE email = $1', [email]);
    let userId;

    const fieldsToUpdate: any = { ...formData };

    // Parse JSON fields if they are strings
    if (typeof fieldsToUpdate.work_experience === 'string') {
        try { fieldsToUpdate.work_experience = JSON.parse(fieldsToUpdate.work_experience); } catch (e) { }
    }
    if (typeof fieldsToUpdate.declarations === 'string') {
        try { fieldsToUpdate.declarations = JSON.parse(fieldsToUpdate.declarations); } catch (e) { }
    }

    // Helper to map form fields to DB columns safely
    // We only take fields that match our schema
    const dbColumns = [
        'first_name', 'last_name', 'father_name', 'father_mobile', 'father_email',
        'mother_name', 'mother_mobile', 'mother_email', 'dob', 'gender', 'nationality',
        'city', 'state', 'pincode', 'highest_qualification', 'university',
        'current_semester', 'cgpa', 'graduation_year', 'work_experience', 'declarations',
        'mobile'
    ];

    const valuesToUpdate: any[] = [];
    const setClauses: string[] = [];
    let paramIndex = 1;

    for (const col of dbColumns) {
        if (fieldsToUpdate[col] !== undefined) {
            setClauses.push(`${col} = $${paramIndex}`);
            valuesToUpdate.push(fieldsToUpdate[col]);
            paramIndex++;
        }
    }

    // Handle document_urls (merge with existing if possible, or just set)
    // If we already have a user, we might want to fetch their current docs to not lose them
    let currentDocs = {};
    if ((userResult.rowCount ?? 0) > 0 && userResult.rows[0].document_urls) {
        currentDocs = userResult.rows[0].document_urls;
    }
    const finalDocs = { ...currentDocs, ...documentUrls };

    // Only update docs if we uploaded something or if it's a fresh insert
    if (Object.keys(documentUrls).length > 0) {
        setClauses.push(`document_urls = $${paramIndex}`);
        valuesToUpdate.push(JSON.stringify(finalDocs));
        paramIndex++;
    }

    if ((userResult.rowCount ?? 0) > 0) {
        // Update
        if (setClauses.length > 0) {
            valuesToUpdate.push(email);
            const sql = `UPDATE users SET ${setClauses.join(', ')} WHERE email = $${paramIndex} RETURNING id`;
            await query(sql, valuesToUpdate);
        }
        userId = userResult.rows[0].id;
    } else {
        // Insert (Registration)
        // Ensure strictly required fields for insert if needed
        const cols = ['email'];
        const vals = ['$1'];
        const valArgs = [email];
        let pIdx = 2;

        // Add other present columns
        for (const col of dbColumns) {
            if (fieldsToUpdate[col] !== undefined) {
                cols.push(col);
                vals.push(`$${pIdx}`);
                valArgs.push(fieldsToUpdate[col]);
                pIdx++;
            }
        }

        if (Object.keys(documentUrls).length > 0) {
            cols.push('document_urls');
            vals.push(`$${pIdx}`);
            valArgs.push(JSON.stringify(finalDocs));
        }

        const sql = `INSERT INTO users (${cols.join(', ')}) VALUES (${vals.join(', ')}) RETURNING id`;
        const res = await query(sql, valArgs);
        userId = res.rows[0].id;
    }

    return {
        success: true,
        userId,
        uploadedFiles: Object.keys(documentUrls)
    };
});
