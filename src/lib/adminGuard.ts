// src/lib/adminGuard.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/login?next=${encodeURIComponent("/dashboard/admin")}`);
  }
  const role = (session.user as any)?.role;
  if (role !== "admin") {
    redirect(`/login?next=${encodeURIComponent("/dashboard/admin")}`);
  }
  return session; // if needed
}
