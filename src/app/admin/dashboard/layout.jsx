import Sidebar from "@/components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <main className="min-h-screen flex text-text-primary">
      <Sidebar />
      <div className="flex-1 p-8">{children}</div>
    </main>
  );
}