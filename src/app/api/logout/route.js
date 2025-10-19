export async function POST() {
  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    "admin_un=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=Strict"
  );

  headers.append("Location", "/admin"); // redirect to login page

  return new Response(null, {
    status: 302, // Redirect status
    headers,
  });
}
