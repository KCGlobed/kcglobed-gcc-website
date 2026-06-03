import { readMultipartFormData, getHeader, setResponseStatus } from 'h3';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    // Prefer the server-side env var directly so this works even if public config isn't populated
    const apiBase = process.env.NUXT_PUBLIC_API_BASE || config.public?.apiBase;
    const targetUrl = `${apiBase}/api/students/create-update-student-profile/`;

    // Pass through the Authorization header from the browser request
    const authHeader = getHeader(event, 'authorization');

    console.log('[PROXY] Received profile update request. Forwarding to:', targetUrl);
    console.log('[PROXY] Auth header present:', !!authHeader);

    try {
        // ── Parse the incoming multipart/form-data from browser ────────────
        const parts = await readMultipartFormData(event);

        if (!parts || parts.length === 0) {
            console.error('[PROXY] No form data received');
            setResponseStatus(event, 400);
            return { success: false, message: 'No form data received by proxy' };
        }

        console.log('[PROXY] Received', parts.length, 'form fields/files');

        // ── Reconstruct FormData to forward to Django ──────────────────────
        const outgoing = new FormData();
        let totalFileSize = 0;

        for (const part of parts) {
            if (!part.name) continue;

            if (part.filename) {
                // Binary file field
                const blob = new Blob([new Uint8Array(part.data)], { type: part.type || 'application/octet-stream' });
                outgoing.append(part.name, blob, part.filename);
                totalFileSize += part.data.length;
                console.log(`[PROXY] File field '${part.name}': ${part.filename} (${(part.data.length / 1024).toFixed(1)} KB, type: ${part.type})`);
            } else {
                // Text field
                const value = part.data.toString('utf-8');
                outgoing.append(part.name, value);
                console.log(`[PROXY] Text field '${part.name}': ${value.substring(0, 80)}${value.length > 80 ? '...' : ''}`);
            }
        }

        console.log(`[PROXY] Total file payload: ${(totalFileSize / 1024 / 1024).toFixed(2)} MB`);
        console.log('[PROXY] Calling Django backend now...');

        // ── Forward request to Django backend (server-to-server, no CORS) ──
        const djangoResponse = await fetch(targetUrl, {
            method: 'POST',
            body: outgoing,
            headers: authHeader ? { 'Authorization': authHeader } : {},
        });

        const responseText = await djangoResponse.text();
        console.log('[PROXY] Django responded with HTTP', djangoResponse.status);
        console.log('[PROXY] Response body (first 300 chars):', responseText.substring(0, 300));

        // ── Parse and return JSON response ─────────────────────────────────
        let responseJson: any;
        try {
            responseJson = JSON.parse(responseText);
        } catch {
            console.error('[PROXY] Django response was not valid JSON:', responseText.substring(0, 200));
            setResponseStatus(event, 502);
            return {
                success: false,
                message: `Backend returned non-JSON response (HTTP ${djangoResponse.status})`,
                rawBody: responseText.substring(0, 300)
            };
        }

        if (!djangoResponse.ok) {
            console.error(`[PROXY] Django returned non-OK status ${djangoResponse.status}`);
            setResponseStatus(event, djangoResponse.status);
            return {
                success: false,
                status: djangoResponse.status,
                message: responseJson?.message || responseJson?.detail || `Backend error ${djangoResponse.status}`,
                ...responseJson
            };
        }

        console.log('[PROXY] ✅ Profile update forwarded successfully');
        return responseJson;

    } catch (err: any) {
        console.error('[PROXY] ❌ Unexpected error in proxy:', err?.message);
        console.error('[PROXY] Error stack:', err?.stack);
        setResponseStatus(event, 500);
        return {
            success: false,
            message: `Proxy error: ${err?.message || 'Unknown server-side error'}`
        };
    }
});
