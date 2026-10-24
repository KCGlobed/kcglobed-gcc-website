import { withTrailingSlash } from 'ufo';

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const url = query.url as string;
    const filename = query.filename as string || 'document.pdf';

    if (!url) {
        throw createError({
            statusCode: 400,
            statusMessage: 'URL is required',
        });
    }

    try {
        let response = await fetch(url);

        // Retry from the fallback bucket when the primary R2 bucket doesn't have the file
        const { assetBaseUrl, assetFallbackUrl } = useRuntimeConfig(event).public;
        const primary = withTrailingSlash(assetBaseUrl);
        if (!response.ok && assetBaseUrl && assetFallbackUrl && url.startsWith(primary)) {
            response = await fetch(withTrailingSlash(assetFallbackUrl) + url.slice(primary.length));
        }

        if (!response.ok) {
            throw createError({
                statusCode: response.status,
                statusMessage: 'Failed to fetch the file from source',
            });
        }

        // Get the content type from the source response
        const contentType = response.headers.get('content-type') || 'application/octet-stream';

        // Set headers to force download
        setHeaders(event, {
            'Content-Type': contentType,
            'Content-Disposition': `attachment; filename="${filename}"`,
        });

        // Return the stream
        return response.body;
    } catch (error: any) {
        console.error('Download Proxy Error:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error during download proxy',
        });
    }
});
