const BACKEND_ORIGIN = 'http://147.93.29.131:8000';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/')) {
      const backendUrl = new URL(url.pathname + url.search, BACKEND_ORIGIN);
      const proxyRequest = new Request(backendUrl.toString(), request);

      proxyRequest.headers.set('Host', new URL(BACKEND_ORIGIN).host);
      proxyRequest.headers.set('X-Forwarded-Proto', 'https');

      const response = await fetch(proxyRequest);
      const proxyResponse = new Response(response.body, response);
      proxyResponse.headers.set('X-Bleen-Proxy', 'cloudflare-pages-worker');
      return proxyResponse;
    }

    const assetResponse = await env.ASSETS.fetch(request);
    if (assetResponse.status !== 404) {
      return assetResponse;
    }

    return env.ASSETS.fetch(new Request(new URL('/index.html', url), request));
  },
};
