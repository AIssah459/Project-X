export async function onRequestPost(context) {

    const req = context.req;

    console.log(req);

    return new Response("Hello from Cloudflare Pages Function!", {
    headers: {
      "content-type": "text/plain"
    },
    status: 200 // OK
  });
    // const body = await req.json();

    // const backendUrl = process.env.RAILWAY_BACKEND_URL;

    // // Forward request to your Railway backend
    // const res = await fetch(`${backendUrl}/auth/login`, {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify(body),
    //     credentials: 'include'
    // });

    // const cookie = res.headers.get('set-cookie');
    // const data = await res.json();

    // return new Response(JSON.stringify(data), {
    //     status: res.status,
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Set-Cookie': cookie || ''
    //     }
    // });
}