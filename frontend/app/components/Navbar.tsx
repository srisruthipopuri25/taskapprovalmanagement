'use client';
import Link from "next/link";
import { useAuthStore } from "../store/authStore";

export default function Navbar() {
  const logout = useAuthStore(state => state.logout);

  return (
    <nav className="w-64 bg-white shadow p-4 flex flex-col gap-4">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/dashboard/tasks">Tasks</Link>
      <Link href="/profile">Profile</Link>
      <button onClick={logout} className="mt-auto bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </nav>
  );
}
