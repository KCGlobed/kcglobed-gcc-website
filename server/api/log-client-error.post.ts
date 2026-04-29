export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        console.error("====== CLIENT SIDE ERROR LOGGED ON SERVER ======");
        console.error("Time:", new Date().toISOString());
        console.error("Context:", body.context || 'Unknown context');
        console.error("Error Message:", body.errorMessage || 'No message provided');
        console.error("Error Data:", body?.errorData || 'None');
        console.error("User Info:", body?.userInfo || 'None');
        console.error("================================================");
        return { success: true };
    } catch (e) {
        console.error("Failed to parse client error log", e);
        return { success: false };
    }
});
