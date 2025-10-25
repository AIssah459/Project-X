export async function onRequestPost(req) {
    const body = await req.json();

    const backendUrl = process.env.RAILWAY_BACKEND_URL;

    // Forward request to your Railway backend
    const res = await fetch(`${backendUrl}/auth/refresh`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
        credentials: 'include'
    });

    const cookie = res.headers.get('set-cookie');
    const data = await res.json();

    return new Response(JSON.stringify(data), {
        status: res.status,
        headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': cookie || ''
        }
    });
}