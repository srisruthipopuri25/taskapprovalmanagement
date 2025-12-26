import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="w-60 bg-white shadow-sm p-4">
        <h2 className="font-bold text-lg mb-4">Task Manager</h2>
        <div className="min-h-screen">
          <Navbar />
        </div>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
