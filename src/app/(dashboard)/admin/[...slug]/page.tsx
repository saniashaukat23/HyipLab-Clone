import { notFound } from "next/navigation";

const TITLES: Record<string, string> = {
  dashboard: "Dashboard",
  "investment-reports": "Investment Reports",

  deposits: "Deposits",
  "deposits/pending": "Pending Deposits",
  "deposits/approved": "Approved Deposits",
  "deposits/successful": "Successful Deposits",
  "deposits/rejected": "Rejected Deposits",
  "deposits/initiated": "Initiated Deposits",
  "deposits/all": "All Deposits",

  withdrawals: "Withdrawals",
  "withdrawals/pending": "Pending Withdrawals",
  "withdrawals/approved": "Approved Withdrawals",
  "withdrawals/rejected": "Rejected Withdrawals",
  "withdrawals/all": "All Withdrawals",

  users: "Manage Users",
  "users/active": "Active Users",
  "users/banned": "Banned Users",
  "users/email-unverified": "Email Unverified",
  "users/mobile-unverified": "Mobile Unverified",
  "users/kyc-unverified": "KYC Unverified",
  "users/kyc-pending": "KYC Pending",
  "users/with-balance": "Users With Balance",
  "users/all": "All Users",
  "users/notify": "Send Notifications",

  tickets: "Support Tickets",
  "tickets/pending": "Pending Tickets",
  "tickets/closed": "Closed Tickets",
  "tickets/answered": "Answered Tickets",
  "tickets/all": "All Tickets",

  reports: "Reports",
  "reports/transaction-history": "Transaction History",
  "reports/login-history": "Login History",
  "reports/notification-history": "Notification History",
  "reports/invest-history": "Invest History",

  staking: "Manage Staking",
  "staking/plans": "Staking Plans",
  "staking/invest": "Staking Invest",
  "staking/statistics": "Staking Statistics",

  pools: "Manage Pool",
  "pools/plans": "Pool Plans",
  "pools/invest": "Pools Invest",
  "pools/statistics": "Pool Statistics",

  subscribers: "Subscribers",
  "system-settings": "System Settings",

  extra: "Extra",
  "extra/application": "Application",
  "extra/server": "Server",
  "extra/cache": "Cache",
  "extra/update": "Update",

  "report-and-requests": "Report and Requests",
};

export default function AdminAnyPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const segs = params.slug ?? ["dashboard"];
  const key = segs.join("/");
  const title = TITLES[key];
  if (!title) return notFound();

  // TODO: replace with real content for each page
  return (
    <section>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
        {title}
      </h1>
      <p style={{ opacity: 0.8 }}>
        This is <code>/{["admin", ...segs].join("/")}</code>. Put the actual
        page content here (tables, forms, charts, etc).
      </p>
    </section>
  );
}
