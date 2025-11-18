import { requireAdmin } from "@/lib/adminGuard";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import Investment from "@/models/Investment";
import Deposit from "@/models/Deposit";
import Withdrawal from "@/models/Withdrawal";

export async function GET() {
  await requireAdmin();
  await dbConnect();

  const [users, activeInv, pendingInv, depositsPending, withdrawalsPending] =
    await Promise.all([
      User.countDocuments({}),
      Investment.countDocuments({ status: "active" }),
      Investment.countDocuments({ status: "pending" }),
      Deposit.countDocuments({ status: "pending" }),
      Withdrawal.countDocuments({ status: "pending" }),
    ]);

  return Response.json({
    users,
    investments: { active: activeInv, pending: pendingInv },
    deposits: { pending: depositsPending },
    withdrawals: { pending: withdrawalsPending },
  });
}
