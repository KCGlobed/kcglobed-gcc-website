export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { mobile, otp } = body;

    if (!mobile || !otp) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Mobile and OTP are required',
        });
    }
    const storage = useStorage();
    const storedOtp = await storage.getItem(`otp:${mobile}`);
    if (storedOtp && String(storedOtp) === String(otp)) {
        // OTP matched, clear it from storage
        await storage.removeItem(`otp:${mobile}`);
        return { success: true, message: 'OTP verified successfully' };
    } else {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid or expired OTP',
        });
    }
});