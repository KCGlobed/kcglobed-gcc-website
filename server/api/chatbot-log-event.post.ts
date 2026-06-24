import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const {
        student_id,
        event: chatbotEvent,
        section,
        field,
        extra,
        timestamp,
    } = body;

    const tag = `[CHATBOT][event]`;
    const ts = timestamp || new Date().toISOString();

    // Structured log — visible in Cloud Run / server logs
    const logLine = [
        `${tag}`,
        `event=${chatbotEvent}`,
        section  ? `section=${section}` : null,
        field    ? `field=${field}` : null,
        student_id ? `student=${student_id}` : null,
        `ts=${ts}`,
        extra && Object.keys(extra).length > 0 ? `extra=${JSON.stringify(extra)}` : null,
    ].filter(Boolean).join(' ');

    console.log(logLine);

    return { success: true };
});
