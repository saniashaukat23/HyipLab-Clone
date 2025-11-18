import { requireAdmin } from "@/lib/adminGuard";
import dbConnect from "@/lib/dbConnect";
import Withdrawal from "@/models/Withdrawal";

export async function GET(req: Request) {
  await requireAdmin();
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || undefined;
  const q: any = {};
  if (status) q.status = status;
  const data = await Withdrawal.find(q).sort({ createdAt: -1 }).limit(200);
  return Response.json({ data });
}

export async function PATCH(req: Request) {
  await requireAdmin();
  await dbConnect();
  const { id, status } = await req.json();
  const allowed = ["approved", "rejected", "pending"];
  if (!allowed.includes(status))
    return new Response("Bad status", { status: 400 });
  const row = await Withdrawal.findByIdAndUpdate(id, { status }, { new: true });
  if (!row) return new Response("Not found", { status: 404 });
  return Response.json({ ok: true, data: row });
}
