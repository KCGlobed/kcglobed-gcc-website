// Permanent (301) redirect from "/about-overview/" to "/about-overview".
// Both addresses used to return the same page, which lets search engines list
// one page twice. Only page requests are touched: API calls, build assets and
// anything that is not a GET/HEAD request pass through unchanged.
export default defineEventHandler((event) => {
    if (event.method !== "GET" && event.method !== "HEAD") return;

    const url = event.path || "/";
    const queryStart = url.indexOf("?");
    const path = queryStart === -1 ? url : url.slice(0, queryStart);
    const query = queryStart === -1 ? "" : url.slice(queryStart);

    if (path.length <= 1 || !path.endsWith("/")) return;
    if (path.startsWith("/api/") || path.startsWith("/_nuxt/") || path.startsWith("/_ipx/")) return;

    const cleanPath = path.replace(/\/+$/, "");
    // "//example.com/" would turn into a redirect to another site; leave it alone.
    if (!cleanPath.startsWith("/") || cleanPath.startsWith("//")) return;

    return sendRedirect(event, cleanPath + query, 301);
});
