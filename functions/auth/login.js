export async function onRequestPost({request, env}) {
    const backendUrl = `${env.RAILWAY_API_URL}/auth/login`;

    const backendResponse = await fetch(backendUrl, {
        method: "POST",
        credentials: "include",
        headers: request.headers,
        body: request.body,
        redirect: "manual"
    });
    return new Response(backendResponse.body, backendResponse);
}