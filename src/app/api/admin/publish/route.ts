import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import SiteConfigDrafts from "@/models/SiteConfigDrafts";
import SiteConfigPublished from "@/models/SiteConfigPublished";
import AuditLog from "@/models/AuditLog";
import { requireAdmin } from "@/lib/adminGuard";
import { revalidatePath } from "next/cache";

export async function POST() {
  await dbConnect();
  const admin = await requireAdmin();

  const drafts = await SiteConfigDrafts.find().lean();
  for (const row of drafts) {
    await SiteConfigPublished.updateOne(
      { key: row.key },
      {
        $set: {
          value: row.value,
          publishedBy: admin.email,
          publishedAt: new Date(),
        },
      },
      { upsert: true }
    );
  }

  await AuditLog.create({
    actor: admin.email,
    action: "PUBLISH",
    entityType: "setting",
    entityId: "*",
    diff: {},
  });

  // Revalidate public routes that read settings:
  revalidatePath("/"); // homepage
  revalidatePath("/plans"); // add more as needed
  return NextResponse.json({ ok: true });
}
