import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /dashboard (not /dashboard/login, not /[projectId])
  if (pathname === "/dashboard") {
    const cookie = request.cookies.get("admin_session");
    if (cookie?.value !== "authenticated") {
      return NextResponse.redirect(new URL("/dashboard/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
