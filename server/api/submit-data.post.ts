import { query } from '../utils/db';

export default defineEventHandler(async (event) => {
    // Read the body of the request
    const body = await readBody(event);

    console.log("Received data from frontend:", body);

    // Insert data into the database
    // assuming you have a table named 'submissions' with columns 'data' and 'created_at'
    // You might need to adjust the table structure based on your actual DB schema

    try {
        const result = await query(
            'INSERT INTO submissions (data, created_at) VALUES ($1, NOW()) RETURNING *',
            [JSON.stringify(body)]
        );

        return {
            success: true,
            message: "Data saved successfully!",
            receivedData: result.rows[0]
        };
    } catch (error: any) {
        console.error("Database error:", error);
        return {
            success: false,
            message: "Failed to save data",
            error: error.message
        };
    }
});
