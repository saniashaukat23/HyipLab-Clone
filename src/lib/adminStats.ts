// src/lib/adminStats.ts
import dbConnect from "@/lib/dbConnect";
import Payment from "@/models/payment";

type MoneyStats = {
  deposits: {
    totalDeposited: number;
    pendingCount: number;
    rejectedCount: number;
    totalFee: number;
  };
  withdrawals: {
    totalWithdrawn: number;
    pendingCount: number;
    rejectedCount: number;
    totalFee: number;
  };
};

export async function getAdminMoneyStats(): Promise<MoneyStats> {
  await dbConnect();

  // statuses that we consider "completed" money movement
  const completed = ["approved", "successful"];

  // Aggregation for deposits
  const [depAgg] = await Payment.aggregate([
    { $match: { kind: "deposit" } },
    {
      $group: {
        _id: null,
        totalDeposited: {
          $sum: {
            $cond: [{ $in: ["$status", completed] }, "$amount", 0],
          },
        },
        totalFee: {
          $sum: {
            $cond: [
              { $in: ["$status", completed] },
              { $ifNull: ["$fee", 0] },
              0,
            ],
          },
        },
        pendingCount: {
          $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
        },
        rejectedCount: {
          $sum: { $cond: [{ $eq: ["$status", "rejected"] }, 1, 0] },
        },
      },
    },
  ]);

  // Aggregation for withdrawals
  const [withAgg] = await Payment.aggregate([
    { $match: { kind: "withdrawal" } },
    {
      $group: {
        _id: null,
        totalWithdrawn: {
          $sum: {
            $cond: [{ $in: ["$status", completed] }, "$amount", 0],
          },
        },
        totalFee: {
          $sum: {
            $cond: [
              { $in: ["$status", completed] },
              { $ifNull: ["$fee", 0] },
              0,
            ],
          },
        },
        pendingCount: {
          $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
        },
        rejectedCount: {
          $sum: { $cond: [{ $eq: ["$status", "rejected"] }, 1, 0] },
        },
      },
    },
  ]);

  return {
    deposits: {
      totalDeposited: depAgg?.totalDeposited ?? 0,
      pendingCount: depAgg?.pendingCount ?? 0,
      rejectedCount: depAgg?.rejectedCount ?? 0,
      totalFee: depAgg?.totalFee ?? 0,
    },
    withdrawals: {
      totalWithdrawn: withAgg?.totalWithdrawn ?? 0,
      pendingCount: withAgg?.pendingCount ?? 0,
      rejectedCount: withAgg?.rejectedCount ?? 0,
      totalFee: withAgg?.totalFee ?? 0,
    },
  };
}

export function formatUSD(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
