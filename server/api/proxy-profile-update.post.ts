import { getHeader, setResponseStatus } from 'h3';
import { Readable } from 'node:stream';

export default defineEventHandler(async (event) => {
    // const apiBase = process.env.NUXT_PUBLIC_API_BASE;
    const apiBase="http://192.168.1.6:8000"
    // const targetUrl = `${apiBase}/api/students/create-update-student-profile/`;
    const targetUrl = `${apiBase}/api/students/create-update-student-profile-draft/`;


    // Pass headers through: Authorization + Content-Type (includes multipart boundary)
    const authHeader = getHeader(event, 'authorization');
    const contentType = getHeader(event, 'content-type');

    console.log('[PROXY] ▶ Streaming profile update to:', targetUrl);
    console.log('[PROXY] Content-Type:', contentType);
    console.log('[PROXY] Auth header present:', !!authHeader);

    try {
        // ── KEY FIX: Stream the raw body directly to Django ─────────────────
        // Do NOT use readMultipartFormData() — that buffers the ENTIRE upload
        // into Nuxt server memory, causing OOM crash on large file uploads.
        // Instead, pipe the Node.js IncomingMessage stream as a Web ReadableStream
        // so data flows through the proxy without ever being held in memory.
        const bodyStream = Readable.toWeb(event.node.req) as ReadableStream;
        console.log(targetUrl,'-----targetUrl-----')
        const djangoResponse = await fetch(targetUrl, {
            method: 'POST',
            body: bodyStream,
            headers: {
                ...(contentType ? { 'Content-Type': contentType } : {}),
                ...(authHeader ? { 'Authorization': authHeader } : {}),
            },
            // Required to allow a streaming (non-empty) request body
            // @ts-ignore — 'duplex' is a valid fetch option in Node 18+ / undici
            duplex: 'half',
        });
        console.log(djangoResponse,'------djangoResponse------')
        const httpStatus = djangoResponse.status;
        console.log('[PROXY] Django responded with HTTP', httpStatus);

        const responseText = await djangoResponse.text();
        console.log('[PROXY] Response body (first 300):', responseText.substring(0, 300));

        let responseJson: any;
        try {
            responseJson = JSON.parse(responseText);
        } catch {
            console.error('[PROXY] Django response was not valid JSON');
            setResponseStatus(event, 502);
            return {
                success: false,
                message: `Backend returned non-JSON response (HTTP ${httpStatus})`,
            };
        }

        if (!djangoResponse.ok) {
            console.error(`[PROXY] Django non-OK: HTTP ${httpStatus}`);
            setResponseStatus(event, httpStatus);
            return {
                success: false,
                status: httpStatus,
                message: responseJson?.message || responseJson?.detail || `Backend error ${httpStatus}`,
                ...responseJson,
            };
        }

        console.log('[PROXY] ✅ Streamed successfully');
        return responseJson;

    } catch (err: any) {
        console.error('[PROXY] ❌ Proxy error:', err?.message);
        console.error('[PROXY] Stack:', err?.stack);
        setResponseStatus(event, 500);
        return {
            success: false,
            message: `Proxy error: ${err?.message || 'Unknown server error'}`,
        };
    }
});
