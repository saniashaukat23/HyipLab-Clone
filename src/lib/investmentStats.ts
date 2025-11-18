// src/lib/investmentStats.ts
import dbConnect from "@/lib/dbConnect";
import Investment from "@/models/Investment";

/**
 * Returns numeric stats for dashboard
 */
export async function getInvestmentStats() {
  await dbConnect();

  // statuses considered "active"
  const activeStatuses = ["active"];
  const closedStatuses = ["closed"];

  // Aggregation: group all investments into totals we need
  const agg = await Investment.aggregate([
    {
      $group: {
        _id: null,
        totalInvestment: { $sum: "$amount" }, // all time principal
        totalInterest: { $sum: "$interest" }, // all-time interest (if stored)
        totalProfit: { $sum: "$profit" }, // fallback / alternative
        activeInvestment: {
          $sum: {
            $cond: [{ $in: ["$status", activeStatuses] }, "$amount", 0],
          },
        },
        closedInvestment: {
          $sum: {
            $cond: [{ $in: ["$status", closedStatuses] }, "$amount", 0],
          },
        },
      },
    },
  ]);

  const r = agg[0] ?? {};

  // If interest isn't recorded separately, try using profit as "interest" fallback.
  const totalInterest = (r.totalInterest ?? 0) || (r.totalProfit ?? 0);

  return {
    totalInvestment: Number(r.totalInvestment ?? 0),
    totalInterest: Number(totalInterest ?? 0),
    activeInvestment: Number(r.activeInvestment ?? 0),
    closedInvestment: Number(r.closedInvestment ?? 0),
  };
}

export function formatUSD2(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
