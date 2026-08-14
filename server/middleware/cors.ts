export default defineEventHandler((event) => {
  if (event.node.req.url?.startsWith('/api/')) {
    setResponseHeaders(event, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    });

    if (event.node.req.method === 'OPTIONS') {
      event.node.res.statusCode = 204;
      event.node.res.statusMessage = "No Content";
      return '';
    }
  }
});
