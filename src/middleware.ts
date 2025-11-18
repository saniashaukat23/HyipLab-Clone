// src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

/**
 * Middleware guard for admin routes.
 * Uses next-auth's withAuth wrapper and checks token.role === "admin".
 */
export default withAuth(
  (req) => {
    const p = req.nextUrl.pathname;

    // only protect admin zone
    const isAdmin =
      p.startsWith("/admin") ||
      p.startsWith("/dashboard/admin") ||
      p.startsWith("/api/admin");
    if (!isAdmin) return NextResponse.next();

    // nextauth middleware exposes token on req.nextauth?.token
    const role = (req.nextauth?.token as any)?.role;
    if (role !== "admin") {
      // redirect to login and keep next param
      return NextResponse.redirect(
        new URL(`/admin/login?next=${encodeURIComponent(p)}`, req.url)
      );
    }

    return NextResponse.next();
  },
  {
    // only allow requests where a token exists (the authorized callback can be more complex)
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/dashboard/admin/:path*", "/api/admin/:path*"],
};
