// src/app/api/admin/payments/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Payment from "@/models/payment";
import User from "@/models/user"; // make sure file name casing matches

export async function GET(req: Request) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const kind = url.searchParams.get("kind") ?? "deposit"; // deposit or withdrawal
    const status = url.searchParams.get("status") ?? undefined; // optional
    const method = url.searchParams.get("method") ?? undefined;
    const search = url.searchParams.get("search") ?? undefined;
    const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
    const limit = Math.max(
      1,
      Math.min(100, Number(url.searchParams.get("limit") ?? 10))
    );

    const filter: any = { kind };

    if (status) filter.status = status;
    if (method) filter.method = method;
    if (search) {
      // search by username, email, or transactionId — adjust if your schema differs
      filter.$or = [
        { transactionId: { $regex: search, $options: "i" } },
        { method: { $regex: search, $options: "i" } },
      ];
      // we will populate user and further filter if user match required below
    }

    // count + fetch
    const [total, docs] = await Promise.all([
      Payment.countDocuments(filter),
      Payment.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate({ path: "userId", select: "name username email" })
        .lean(),
    ]);

    const items = (docs as any[]).map((d) => ({
      id: d._id,
      gateway: d.method ?? "Unknown",
      transactionRef: d.transactionId ?? "",
      initiatedAt: d.createdAt,
      user: d.userId
        ? { name: d.userId.name, username: d.userId.username, id: d.userId._id }
        : null,
      amount: d.amount ?? 0,
      fee: d.fee ?? 0,
      currency: d.currency ?? "USD",
      conversion: { rate: d.rate ?? 1, toCurrency: d.currency ?? "USD" },
      status: d.status,
      detailsUrl: `/admin/${kind}/details/${d._id}`,
    }));

    return NextResponse.json({ page, limit, total, items });
  } catch (err) {
    console.error("payments API error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
