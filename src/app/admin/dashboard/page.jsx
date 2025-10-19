import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const cookieStore = await cookies(); // ⬅️ MUST await now
  const adminUn = cookieStore.get("admin_un");

  if (!adminUn) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen flex items-center justify-center text-text-primary">
      <div className="bg-background p-10 rounded-xl shadow-lg text-center border border-mid-blue/20">
        <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-lg mb-6">
          Welcome, <span className="text-accent">{adminUn.value}</span> 👋
        </p>

        <form action="/api/logout" method="POST">
          <button
            type="submit"
            className="bg-accent hover:bg-mid-blue transition-colors text-white px-6 py-3 rounded-lg font-semibold"
          >
            Logout
          </button>
        </form>
      </div>
    </main>
  );
}