"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import styles from "./dashboard/Dashboard.module.css";

type MenuItem = {
  name: string;
  icon: string;
  href?: string;
  children?: { name: string; href: string }[];
};

// Build real hrefs for every item
const MENU_ITEMS: MenuItem[] = [
  {
    name: "Dashboard",
    icon: "menu-icon las la-home",
    href: "/admin/dashboard",
  },
  {
    name: "Investment Reports",
    icon: "menu-icon las la-signal",
    href: "/admin/investment-reports",
  },
  {
    name: "Deposits",
    icon: "menu-icon las la-file-invoice-dollar",
    href: "/admin/deposits",
    children: [
      { name: "Pending Deposits", href: "/admin/deposits/pending" },
      { name: "Approved Deposits", href: "/admin/deposits/approved" },
      { name: "Successful Deposits", href: "/admin/deposits/successful" },
      { name: "Rejected Deposits", href: "/admin/deposits/rejected" },
      { name: "Initiated Deposits", href: "/admin/deposits/initiated" },
      { name: "All Deposits", href: "/admin/deposits/all" },
    ],
  },
  {
    name: "Withdrawals",
    icon: "menu-icon la la-bank",
    href: "/admin/withdrawals",
    children: [
      { name: "Pending Withdrawals", href: "/admin/withdrawals/pending" },
      { name: "Approved Withdrawals", href: "/admin/withdrawals/approved" },
      { name: "Rejected Withdrawals", href: "/admin/withdrawals/rejected" },
      { name: "All Withdrawals", href: "/admin/withdrawals/all" },
    ],
  },
  {
    name: "Manage Users",
    icon: "menu-icon las la-users",
    href: "/admin/users",
    children: [
      { name: "Active Users", href: "/admin/users/active" },
      { name: "Banned Users", href: "/admin/users/banned" },
      { name: "Email Unverified", href: "/admin/users/email-unverified" },
      { name: "Mobile Unverified", href: "/admin/users/mobile-unverified" },
      { name: "KYC Unverified", href: "/admin/users/kyc-unverified" },
      { name: "KYC pending", href: "/admin/users/kyc-pending" },
      { name: "With Balance", href: "/admin/users/with-balance" },
      { name: "All Users", href: "/admin/users/all" },
      { name: "Send Notifications", href: "/admin/users/notify" },
    ],
  },
  {
    name: "Support Tickets",
    icon: "menu-icon la la-ticket",
    href: "/admin/tickets",
    children: [
      { name: "Pending Tickets", href: "/admin/tickets/pending" },
      { name: "Closed Tickets", href: "/admin/tickets/closed" },
      { name: "Answered Tickets", href: "/admin/tickets/answered" },
      { name: "All tickets", href: "/admin/tickets/all" },
    ],
  },
  {
    name: "Report",
    icon: "menu-icon la la-list",
    href: "/admin/reports",
    children: [
      {
        name: "Transaction History",
        href: "/admin/reports/transaction-history",
      },
      { name: "Login History", href: "/admin/reports/login-history" },
      {
        name: "Notification History",
        href: "/admin/reports/notification-history",
      },
      { name: "Invest History", href: "/admin/reports/invest-history" },
    ],
  },
  {
    name: "Manage staking",
    icon: "menu-icon las la-chart-line",
    href: "/admin/staking",
    children: [
      { name: "Plans", href: "/admin/staking/plans" },
      { name: "Staking Invest", href: "/admin/staking/invest" },
      { name: "Statistics", href: "/admin/staking/statistics" },
    ],
  },
  {
    name: "Manage pool",
    icon: "menu-icon las la-cubes",
    href: "/admin/pools",
    children: [
      { name: "Plans", href: "/admin/pools/plans" },
      { name: "Pools Invest", href: "/admin/pools/invest" },
      { name: "Statistics", href: "/admin/pools/statistics" },
    ],
  },
  {
    name: "Subscribers",
    icon: "menu-icon las la-thumbs-up",
    href: "/admin/subscribers",
  },
  {
    name: "System Setting",
    icon: "menu-icon la la-life-ring",
    href: "/admin/system-settings",
  },
  {
    name: "Extra",
    icon: "menu-icon las la-server",
    href: "/admin/extra",
    children: [
      { name: "Application", href: "/admin/extra/application" },
      { name: "Server", href: "/admin/extra/server" },
      { name: "Cache", href: "/admin/extra/cache" },
      { name: "Update", href: "/admin/extra/update" },
    ],
  },
  {
    name: "Report and Requests",
    icon: "menu-icon las la-bug",
    href: "/admin/report-and-requests",
  },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  // close dropdown on click outside or Esc
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) =>
      prev.includes(menu) ? prev.filter((m) => m !== menu) : [...prev, menu]
    );
  };

  const isActive = (href?: string) =>
    href ? pathname === href || pathname.startsWith(href + "/") : false;

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div>
          <img
            src="https://script.viserlab.com/hyiplab/demo/assets/images/logo_icon/logo.png"
            alt=""
          />
          <nav className={styles.menu}>
            {MENU_ITEMS.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className={`${styles.menuItem} ${
                        isActive(item.href) ? styles.active : ""
                      }`}
                    >
                      <i className={item.icon}></i>
                      {item.name} ▾
                    </button>
                    {openMenus.includes(item.name) && (
                      <div className={styles.subMenu}>
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={`${styles.subMenuItem} ${
                              isActive(child.href) ? styles.active : ""
                            }`}
                          >
                            <i className="menu-icon las la-dot-circle"></i>
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className={`${styles.menuItem} ${
                      isActive(item.href) ? styles.active : ""
                    }`}
                  >
                    <i className={item.icon}></i>
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        <header className={styles.header}>
          <input type="text" placeholder="Search here" />
          <ul className={styles.actionLists}>
            <li className={styles.actionItem}>
              <a href="/">
                <i className="las la-globe text-2xl"></i>
              </a>
            </li>
            <li className={styles.actionItem}>
              <a href="/">
                <i className="las la-bell icon-left-right text-2xl"></i>
              </a>
            </li>
            <li className={styles.actionItem}>
              <a href="/">
                <i className="las la-wrench text-2xl"></i>
              </a>
            </li>
            <span className={styles.navUser}>
              <img
                src="https://script.viserlab.com/hyiplab/demo/assets/admin/images/profile/66a9d96ce8bc41722407276.png"
                alt=""
              />
              <p>Admin</p>
              <div ref={ref} className={styles.wrapper2}>
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={open}
                  onClick={() => setOpen((v) => !v)}
                  className={styles.trigger}
                >
                  <i className={`las la-chevron-circle-down ${styles.icon2}`} />
                </button>
                {open && (
                  <div role="menu" className={styles.menu2}>
                    <Link
                      href="/admin/change-password"
                      role="menuitem"
                      className={styles.menuItem2}
                      onClick={() => setOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/admin"
                      role="menuitem"
                      className={styles.menuItem2}
                      onClick={() => setOpen(false)}
                    >
                      Change Password
                    </Link>
                    <button
                      role="menuitem"
                      className={styles.menuItem2}
                      onClick={() => signOut({ callbackUrl: "/admin/login" })}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </span>
          </ul>
        </header>

        <div className={styles.pageBody}>{children}</div>
      </main>
    </div>
  );
}
