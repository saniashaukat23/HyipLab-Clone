// Server route: returns paginated deposits
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Payment from "@/models/payment"; // adjust path/casing if needed
import User from "@/models/user";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
    const limit = Math.max(
      1,
      Math.min(100, Number(url.searchParams.get("limit") ?? 10))
    );
    const status = url.searchParams.get("status") ?? "pending"; // default show pending
    const method = url.searchParams.get("method"); // optional filter by payment method

    const filter: any = { kind: "deposit" };
    if (status) filter.status = status;
    if (method) filter.method = method; // adjust if your schema uses different field

    const [total, docs] = await Promise.all([
      Payment.countDocuments(filter),
      Payment.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate({ path: "userId", select: "name username email" })
        .lean(),
    ]);

    // Map docs into the shape front-end expects
    const items = (docs as any[]).map((d) => ({
      id: d._id,
      gateway: d.method ?? d.gateway ?? "Unknown", // change field if needed
      transactionRef: d.transactionId ?? d.txRef ?? d.reference ?? "",
      initiatedAt: d.createdAt,
      amount: d.amount ?? 0,
      fee: d.fee ?? 0,
      currency: d.currency ?? "USD",
      conversion: { rate: d.rate ?? 1, toCurrency: d.currency ?? "USD" }, // optional
      status: d.status,
      user: d.userId
        ? { name: d.userId.name, username: d.userId.username, id: d.userId._id }
        : null,
      detailsUrl: `/admin/deposit/details/${d._id}`,
    }));

    return NextResponse.json({
      page,
      limit,
      total,
      items,
    });
  } catch (err) {
    console.error("deposits API error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
