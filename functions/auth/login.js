export async function onRequest({ request, params }) {
  const url = new URL(request.url);

  // === CONFIG ===
  const targetOrigin = "https://project-x-api.up.railway.app";
  const frontendOrigin = "https://project-x-20h.pages.dev";

  // Build target URL
  const targetUrl = `${targetOrigin}/${params.path}${url.search}`;

  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": frontendOrigin,
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  // Forward the incoming request to target
  const modifiedRequest = new Request(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
    redirect: "manual",
  });

  const response = await fetch(modifiedRequest);

  // Clone response headers & ensure Set-Cookie is preserved
  const newHeaders = new Headers(response.headers);

  // Cloudflare sometimes blocks multiple Set-Cookie headers; use append() if needed
  const setCookie = response.headers.get("set-cookie");
  if (setCookie) newHeaders.set("set-cookie", setCookie);

  // --- Add CORS headers for credentials ---
  newHeaders.set("Access-Control-Allow-Origin", frontendOrigin);
  newHeaders.set("Access-Control-Allow-Credentials", "true");
  newHeaders.set("Access-Control-Expose-Headers", "Set-Cookie");

  return new Response(response.body, {
    status: response.status,
    headers: newHeaders,
  });
}
