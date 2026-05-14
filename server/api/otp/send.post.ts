import { sendSms } from "~/server/utils/sms";



export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { mobile } = body;

    if (!mobile || mobile.length !== 10) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Valid 10-digit mobile number is required',
        });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in Nitro storage (cache) for 10 minutes
    // Using default storage which is always available
    const storage = useStorage();
    await storage.setItem(`otp:${mobile}`, otp, { ttl: 600 });

    const message = `Dear Candidate, your OTP for GCC School verification is ${otp}. Please do not share this OTP with anyone. It is valid for 10 minutes. - GCC School`;
    const result = await sendSms(mobile, message);

    if (result.success) {
        return { success: true, message: 'OTP sent successfully' };
    } else {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to send OTP via SMS gateway',
        });
    }
});

