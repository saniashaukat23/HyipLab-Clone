import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import SiteConfigDrafts from "@/models/SiteConfigDrafts";
import AuditLog from "@/models/AuditLog";
import { requireAdmin } from "@/lib/adminGuard";

export async function GET() {
  await dbConnect();
  const rows = await SiteConfigDrafts.find().lean();
  const data: Record<string, any> = {};
  rows.forEach((r: any) => (data[r.key] = r.value));
  return NextResponse.json(data);
}

export async function PATCH(req: Request) {
  await dbConnect();
  const admin = await requireAdmin();
  const { key, value } = await req.json();

  const before = await SiteConfigDrafts.findOne({ key }).lean();
  const after = await SiteConfigDrafts.findOneAndUpdate(
    { key },
    { $set: { value, updatedBy: admin.email, updatedAt: new Date() } },
    { upsert: true, new: true }
  ).lean();

  await AuditLog.create({
    actor: admin.email,
    action: "UPDATE_SETTING",
    entityType: "setting",
    entityId: key,
    diff: { before, after },
  });

  return NextResponse.json({ ok: true });
}
