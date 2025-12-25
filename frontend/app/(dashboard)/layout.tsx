export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="w-60 bg-white shadow-sm p-4">
        <h2 className="font-bold text-lg mb-4">Task Manager</h2>
        <nav className="space-y-2">
          <a href="/dashboard">Dashboard</a>
          <a href="/profile">Profile</a>
        </nav>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
