export async function POST(req) {
  const { username, password } = await req.json();

  const admins = {
    "admin1": "password123",
    "superuser": "securePass!"
  };

  if (admins[username] && admins[username] === password) {
    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      `admin_un=${username}; HttpOnly; Path=/; Max-Age=${60 * 60}`
    );

    return new Response(JSON.stringify({ success: true }), { status: 200, headers });
  } else {
    return new Response(JSON.stringify({ success: false }), { status: 401 });
  }
}