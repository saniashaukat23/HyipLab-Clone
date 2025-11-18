import styles from "./Dashboard.module.css";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import StatCard from "@/app/components/admin/StatCard";
import { requireAdmin } from "@/lib/adminGuard";
import Payments from "@/models/payment";
import { getAdminMoneyStats, formatUSD } from "@/lib/adminStats";
import WidgetCard from "@/app/components/admin/WidgetCard";
import { getInvestmentStats, formatUSD2 } from "@/lib/investmentStats";

export default async function AdminDashboardPage() {
  const { deposits, withdrawals } = await getAdminMoneyStats();
  const stats = await getInvestmentStats();

  await requireAdmin();
  await dbConnect();
  const [
    totalUsers,
    activeUsers,
    emailUnverified,
    mobileUnverified,
    totalPayments,
  ] = await Promise.all([
    User.countDocuments({}), // total
    User.countDocuments({ banned: { $ne: true } }), // or { role: "user" } if you prefer
    User.countDocuments({ isEmailVerified: false }),
    User.countDocuments({ isMobileVerified: false }), // change to your field name if different
    Payments.countDocuments({}),
  ]);

  return (
    <section>
      <div className={styles.DashboardHeader}>
        <h1 className={styles.DashHeading}>Dashboard</h1>
        <button className={styles.CronButton}>
          {" "}
          <i className="las la-server"></i> Cron Setup
        </button>
      </div>
      <div className={`${styles.Dashgrid} ${styles.noSep}`}>
        <StatCard
          color="primary"
          BGColor="primaryBG"
          title="Total Users"
          value={totalUsers}
          iconClass="las la-users"
          href="/admin/users"
        />
        <StatCard
          color="success"
          BGColor="successBG"
          title="Active Users"
          value={activeUsers}
          iconClass="las la-user-check"
          href="/admin/users/active"
        />
        <StatCard
          color="danger"
          BGColor="dangerBG"
          title="Email Unverified Users"
          value={emailUnverified}
          iconClass="lar la-envelope"
          href="/admin/users/email-unverified"
        />
        <StatCard
          color="warning"
          BGColor="warningBG"
          title="Mobile Unverified Users"
          value={mobileUnverified}
          iconClass="las la-comment-slash"
          href="/admin/users/mobile-unverified"
        />
      </div>
      <div className={styles.row}>
        <section className={styles.panel}>
          <div className={styles.panelBody}>
            <h5 className={styles.panelTitle}>Deposits</h5>
            <div className={styles.Dashgrid}>
              <WidgetCard
                href="/admin/deposits/all"
                iconClass="fas fa-hand-holding-usd"
                amount={formatUSD(deposits.totalDeposited)}
                title="Total Deposited"
                color="primary"
                BGColor="primaryBG"
              />
              <WidgetCard
                href="/admin/deposits/pending"
                iconClass="fas fa-spinner"
                amount={deposits.pendingCount}
                title="Pending Deposits"
                color="warning"
                BGColor="warningBG"
              />
              <WidgetCard
                href="/admin/deposits/rejected"
                iconClass="fas fa-ban"
                amount={deposits.rejectedCount}
                title="Rejected Deposits"
                color="danger"
                BGColor="dangerBG"
              />
              <WidgetCard
                href="/admin/deposits/all"
                iconClass="fas fa-percentage"
                amount={formatUSD(deposits.totalFee)}
                title="Deposited Charge"
                color="primary"
                BGColor="primaryBG"
              />
            </div>
          </div>
        </section>

        {/* Withdrawals */}
        <section className={styles.panel}>
          <div className={styles.panelBody}>
            <h5 className={styles.panelTitle}>Withdrawals</h5>
            <div className={styles.Dashgrid}>
              <WidgetCard
                href="/admin/withdrawals/all"
                iconClass="lar la-credit-card"
                amount={formatUSD(withdrawals.totalWithdrawn)}
                title="Total Withdrawn"
                color="success"
                BGColor="successBG"
              />
              <WidgetCard
                href="/admin/withdrawals/pending"
                iconClass="fas fa-spinner"
                amount={withdrawals.pendingCount}
                title="Pending Withdrawals"
                color="warning"
                BGColor="warningBG"
              />
              <WidgetCard
                href="/admin/withdrawals/rejected"
                iconClass="las la-times-circle"
                amount={withdrawals.rejectedCount}
                title="Rejected Withdrawals"
                color="danger"
                BGColor="dangerBG"
              />
              <WidgetCard
                href="/admin/withdrawals/all"
                iconClass="las la-percent"
                amount={formatUSD(withdrawals.totalFee)}
                title="Withdrawal Charge"
                color="primary"
                BGColor="primaryBG"
              />
            </div>
          </div>
        </section>
        <div className={`${styles.Dashgrid} ${styles.noSep} mt-10`}>
          <StatCard
            color="blue"
            BGColor=""
            title="Total Investments"
            value={formatUSD(stats.totalInvestment)}
            iconClass="las la-chart-bar"
            href="/admin/report/invest/history"
          />
          <StatCard
            color="green"
            BGColor=""
            title="Total Interest"
            value={formatUSD(stats.totalInterest)}
            iconClass="las la-chart-pie"
            href="/admin/report/transaction?remark=interest"
          />
          <StatCard
            color="orange"
            BGColor=""
            title="Active Investments"
            value={formatUSD(stats.activeInvestment)}
            iconClass="las la-chart-area"
            href="/admin/report/invest/history?status=1"
          />
          <StatCard
            color="purple"
            BGColor=""
            title="Closed Investments"
            value={formatUSD(stats.closedInvestment)}
            iconClass="las la-chart-line"
            href="/admin/report/invest/history?status=1"
          />
        </div>
      </div>
    </section>
  );
}
