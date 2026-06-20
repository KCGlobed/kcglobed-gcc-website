import { defineEventHandler, readMultipartFormData, getHeader } from 'h3';

export default defineEventHandler(async (event) => {
    const tag = `[CHATBOT][doc_upload]`;

    const authHeader = getHeader(event, 'authorization');
    const apiBase = process.env.NUXT_PUBLIC_API_BASE;

    if (!apiBase) {
        console.error(`${tag} NUXT_PUBLIC_API_BASE is not set`);
        return { success: false, error: 'Server misconfiguration' };
    }

    try {
        const parts = await readMultipartFormData(event);
        if (!parts || parts.length === 0) {
            return { success: false, error: 'No multipart data received' };
        }

        // Extract metadata fields
        let student_id = '';
        let doc_type = '';
        let fileData: { filename: string; type: string; data: Buffer } | null = null;

        for (const part of parts) {
            if (part.name === 'student_id') {
                student_id = part.data.toString();
            } else if (part.name === 'doc_type') {
                doc_type = part.data.toString();
            } else if (part.name === 'file' && part.filename) {
                fileData = {
                    filename: part.filename,
                    type: part.type || 'application/octet-stream',
                    data: part.data,
                };
            }
        }

        if (!fileData) {
            console.error(`${tag} No file part found in multipart data`);
            return { success: false, error: 'No file uploaded' };
        }

        console.log(`${tag} doc_type=${doc_type} student=${student_id} filename=${fileData.filename} size=${Math.round(fileData.data.length / 1024)}KB type=${fileData.type}`);

        // Build FormData to forward to Django
        const formData = new FormData();
        formData.append('user', String(student_id));

        const blob = new Blob([fileData.data], { type: fileData.type });

        // Map doc_type to Django field key
        const docKeyMap: Record<string, string> = {
            aadhaar: 'aadhaar',
            dob_proof: 'dob_certificate',
            photo: 'photo',
            signature: 'signature',
            resume: 'resume',
            identity_proof: 'identity_proof',
            tenth_marksheet: 'tenth_marksheet',
            twelth_marksheet: 'twelth_marksheet',
            graduation_first_marksheet: 'graduation_first_marksheet',
            graduation_second_marksheet: 'graduation_second_marksheet',
            graduation_third_marksheet: 'graduation_third_marksheet',
            graduation_forth_marksheet: 'graduation_forth_marksheet',
            graduation_fifth_marksheet: 'graduation_fifth_marksheet',
            graduation_sixth_marksheet: 'graduation_sixth_marksheet',
            additional_document: 'additional_document',
        };

        const djangoKey = docKeyMap[doc_type] || doc_type;
        formData.append(djangoKey, blob, fileData.filename);

        const headers: Record<string, string> = {};
        if (authHeader) headers['Authorization'] = authHeader;

        const response = await $fetch<any>(
            `${apiBase}/api/users/student-profile-upload/${student_id}`,
            {
                method: 'POST',
                headers,
                body: formData,
            }
        );

        console.log(`${tag} SUCCESS doc_type=${doc_type} student=${student_id} filename=${fileData.filename}`);
        console.log(`${tag} response=${JSON.stringify(response).substring(0, 300)}`);

        return { success: true, data: response };
    } catch (err: any) {
        const errMsg = err?.message || String(err);
        const errData = err?.data ? JSON.stringify(err.data).substring(0, 300) : '';
        console.error(`${tag} FAILED error=${errMsg} data=${errData}`);
        return { success: false, error: errMsg };
    }
});
