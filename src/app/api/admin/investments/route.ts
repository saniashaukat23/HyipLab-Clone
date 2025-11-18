import { requireAdmin } from "@/lib/adminGuard";
import dbConnect from "@/lib/dbConnect";
import Investment from "@/models/Investment";
import AuditLog from "@/models/AuditLog";

export async function GET(req: Request) {
  await requireAdmin();
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || undefined;
  const q: any = {};
  if (status) q.status = status;
  const data = await Investment.find(q)
    .populate("userId planId")
    .sort({ createdAt: -1 })
    .limit(200);
  return Response.json({ data });
}

export async function PATCH(req: Request) {
  const session = await requireAdmin();
  await dbConnect();
  const { id, status } = await req.json();
  const allowed = ["approved", "rejected", "active", "completed"];
  if (!allowed.includes(status))
    return new Response("Bad status", { status: 400 });
  const inv = await Investment.findByIdAndUpdate(id, { status }, { new: true });
  if (!inv) return new Response("Not found", { status: 404 });
  await AuditLog.create({
    actorId: (session.user as any).id,
    action: `INVESTMENT_${status.toUpperCase()}`,
    targetType: "investment",
    targetId: inv._id,
  });
  return Response.json({ ok: true, data: inv });
}
