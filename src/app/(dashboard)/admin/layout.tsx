import type { ReactNode } from "react";
import AdminShell from "./AdminShell"; // the sidebar/header shell ("use client")
import { requireAdmin } from "@/lib/adminGuard"; // optional guard

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdmin(); // redirect to /admin/login if not allowed
  return <AdminShell>{children}</AdminShell>;
}
