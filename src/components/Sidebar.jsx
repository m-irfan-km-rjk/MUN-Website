export default function Sidebar() {
    return (
        <aside className="w-64 h-screen flex flex-col justify-between bg-gradient-to-b from-mid-blue/10 to-mid-blue/5 backdrop-blur-md border-r border-mid-blue/30 p-6 shadow-lg">
            {/* Navigation */}
            <nav className="flex flex-col space-y-3">
                <a
                    href="/admin/dashboard/general"
                    className="px-3 py-2 text-text-primary/80 hover:text-accent hover:bg-accent/10 rounded-lg transition-all duration-200"
                >
                    General
                </a>
                <a
                    href="/admin/dashboard/allotment"
                    className="px-3 py-2 text-text-primary/80 hover:text-accent hover:bg-accent/10 rounded-lg transition-all duration-200"
                >
                    Allotment
                </a>
                <a
                    href="/admin/dashboard/settings"
                    className="px-3 py-2 text-text-primary/80 hover:text-accent hover:bg-accent/10 rounded-lg transition-all duration-200"
                >
                    Settings
                </a>
            </nav>

            {/* Logout Button */}
            <form method="POST" action="/api/logout" className="mt-6">
                <button
                    type="submit"
                    className="bg-accent text-white font-medium hover:bg-accent/80 py-2.5 w-full rounded-full transition-all duration-200 shadow-md hover:shadow-accent/40"
                >
                    Logout
                </button>
            </form>
        </aside>
    );
}