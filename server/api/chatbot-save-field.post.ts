import { defineEventHandler, readBody, getHeader } from 'h3';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const {
        student_id,
        field,
        value,
        section,
        api_key,         // Django FormData field name (may differ from formData key)
        api_value,       // Transformed/mapped value ready for Django (e.g. gender: 1 instead of "Male")
    } = body;

    const tag = `[CHATBOT][field_save]`;

    console.log(`${tag} section=${section} field=${field} api_key=${api_key} student=${student_id}`);
    console.log(`${tag} raw_value=${JSON.stringify(value)} api_value=${JSON.stringify(api_value)}`);

    const apiBase = process.env.NUXT_PUBLIC_API_BASE;
    const authHeader = getHeader(event, 'authorization');

    if (!apiBase) {
        console.error(`${tag} NUXT_PUBLIC_API_BASE is not set`);
        return { success: false, error: 'Server misconfiguration' };
    }

    try {
        const formData = new FormData();
        formData.append('user', String(student_id || ''));

        // Append the specific field using its Django API key
        const fieldName = api_key || field;
        const fieldValue = api_value !== undefined ? api_value : value;
        formData.append(fieldName, String(fieldValue ?? ''));

        const headers: Record<string, string> = {};
        if (authHeader) headers['Authorization'] = authHeader;

        const response = await $fetch<any>(
            `${apiBase}/api/students/create-update-student-profile-draft/`,
            {
                method: 'POST',
                headers,
                body: formData,
            }
        );

        console.log(`${tag} SUCCESS section=${section} field=${field} student=${student_id}`);
        console.log(`${tag} response=${JSON.stringify(response).substring(0, 300)}`);

        return { success: true, data: response };
    } catch (err: any) {
        const errMsg = err?.message || String(err);
        const errData = err?.data ? JSON.stringify(err.data).substring(0, 300) : '';
        console.error(`${tag} FAILED section=${section} field=${field} student=${student_id} error=${errMsg} data=${errData}`);
        return { success: false, error: errMsg };
    }
});
