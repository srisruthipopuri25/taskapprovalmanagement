import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register");

  const isDashboardRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/profile");

  // 🚫 Not logged in → trying to access dashboard
  if (!token && isDashboardRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ Logged in → trying to access login/register
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}
