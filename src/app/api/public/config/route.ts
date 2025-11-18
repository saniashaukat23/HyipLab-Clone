import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import SiteConfigPublished from "@/models/SiteConfigPublished";

export async function GET() {
  await dbConnect();
  const rows = await SiteConfigPublished.find().lean();
  const data: Record<string, any> = {};
  rows.forEach((r: any) => (data[r.key] = r.value));
  return new NextResponse(JSON.stringify(data), {
    headers: { "Cache-Control": "public, s-maxage=60" },
  });
}
