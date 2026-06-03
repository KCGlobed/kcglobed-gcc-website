export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const timestamp = new Date().toISOString();

        console.error("====== CLIENT SIDE ERROR LOGGED ON SERVER ======");
        console.error(`Time: ${timestamp}`);
        console.error(`Context: ${body.context || 'Unknown context'}`);
        console.error(`Error Message: ${body.errorMessage || 'No message provided'}`);
        console.error(`Error Name/Type: ${body.errorName || 'Unknown'}`);
        console.error(`Error Data: ${typeof body.errorData === 'object' ? JSON.stringify(body.errorData) : body.errorData || 'None'}`);
        console.error(`Error Stack: ${body.errorStack || 'No stack available'}`);
        console.error(`Is Network Error: ${body.isNetworkError ?? 'Unknown'}`);
        console.error(`Is CORS Error: ${body.isCorsError ?? 'Unknown'}`);
        console.error(`Is Timeout: ${body.isTimeout ?? 'Unknown'}`);
        console.error(`HTTP Status: ${body.httpStatus || 'N/A'}`);
        console.error(`API URL: ${body.apiUrl || 'Unknown'}`);
        console.error(`User Agent: ${body.userAgent || 'Unknown'}`);
        console.error(`Online Status: ${body.isOnline ?? 'Unknown'}`);
        console.error(`Connection Type: ${body.connectionType || 'Unknown'}`);
        console.error(`User Info: ${JSON.stringify(body.userInfo) || 'None'}`);
        console.error("================================================");

        return { success: true };
    } catch (e) {
        console.error("Failed to parse client error log", e);
        return { success: false };
    }
});
