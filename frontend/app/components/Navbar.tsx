"use client";

import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
      <div className="flex gap-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/tasks">Tasks</Link>
        <Link href="/profile">Profile</Link>
      </div>

      <h1
        className="text-xl font-semibold cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        📝 Task Manager
      </h1>

      <Button danger icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Button>
    </nav>
  );
}
