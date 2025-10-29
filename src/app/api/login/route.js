import { connectDB } from "@/lib/mongodb";
import User from "@/models/User"; // define this model

export async function POST(req) {
  try {
    await connectDB();
    const { username, password } = await req.json();

    const admin = await User.findOne({ username });

    if (!admin || admin.password !== password) {
      return new Response(JSON.stringify({ success: false, message: "Invalid credentials" }), { status: 401 });
    }

    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      `admin_un=${username}; HttpOnly; Path=/; Max-Age=${60 * 60}`
    );

    return new Response(JSON.stringify({ success: true }), { status: 200, headers });

  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ success: false, message: "Server error" }), { status: 500 });
  }
}
