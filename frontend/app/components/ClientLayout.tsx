"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const hideNavbar = pathname === "/login" || pathname === "/register";

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    const isProtected =
      pathname.startsWith("/dashboard") || pathname.startsWith("/profile") || pathname.startsWith("/tasks");
    if (!token && isProtected) {
      router.replace("/login");
    }
  }, [pathname, router]);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className={!hideNavbar ? "pt-20 px-6" : ""}>{children}</main>
    </>
  );
}
