// src/components/admin/PaymentsTable/PaymentsTable.tsx
"use client";

import { useEffect, useState } from "react";
import styles from "./PaymentTable.module.css";

type Item = {
  id: string;
  gateway: string;
  transactionRef: string;
  initiatedAt: string;
  user: { name?: string; username?: string } | null;
  amount: number;
  fee: number;
  currency: string;
  conversion?: { rate: number; toCurrency: string };
  status: string;
  detailsUrl: string;
};

export default function PaymentsTable({
  kind = "deposit",
  status,
  initialPage = 1,
  pageSize = 10,
  method,
  search,
}: {
  kind?: "deposit" | "withdrawal";
  status?: string;
  initialPage?: number;
  pageSize?: number;
  method?: string | undefined;
  search?: string | undefined;
}) {
  const [page, setPage] = useState(initialPage);
  const [items, setItems] = useState<Item[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetchPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, status, kind, method, search]);

  async function fetchPage(p: number) {
    setLoading(true);
    setErr(null);
    try {
      const qs = new URLSearchParams();
      qs.set("kind", kind);
      qs.set("page", String(p));
      qs.set("limit", String(pageSize));
      if (status) qs.set("status", status);
      if (method) qs.set("method", method);
      if (search) qs.set("search", search);

      const res = await fetch(`/api/admin/payments?${qs.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setItems(json.items || []);
      setTotal(json.total || 0);
    } catch (e: any) {
      console.error("fetch payments failed", e);
      setErr("Failed to load records");
    } finally {
      setLoading(false);
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  function formatDate(iso?: string | Date) {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleString();
  }
  function timeAgo(iso?: string | Date) {
    if (!iso) return "";
    const d = new Date(iso);
    const diff = Math.floor((Date.now() - d.getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }
  function formatCurrency(value: number, currency = "USD") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(value ?? 0);
  }
  function capitalize(s?: string) {
    if (!s) return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  function statusClass(status?: string) {
    switch ((status || "").toLowerCase()) {
      case "pending":
        return `${styles.badge} ${styles.badgeWarning}`;
      case "approved":
      case "successful":
        return `${styles.badge} ${styles.badgeSuccess}`;
      case "rejected":
        return `${styles.badge} ${styles.badgeDanger}`;
      case "initiated":
        return `${styles.badge} ${styles.badgeInfo}`;
      default:
        return `${styles.badge} ${styles.badgeMuted}`;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Gateway | Transaction</th>
              <th>Initiated</th>
              <th>User</th>
              <th>Amount</th>
              <th>Conversion</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className={styles.center}>
                  Loading…
                </td>
              </tr>
            ) : err ? (
              <tr>
                <td colSpan={7} className={styles.center}>
                  {err}
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={7} className={styles.center}>
                  No records
                </td>
              </tr>
            ) : (
              items.map((it) => (
                <tr key={it.id}>
                  <td data-label="Gateway | Transaction">
                    <strong>
                      <a
                        href={`/admin/${kind}/pending?method=${encodeURIComponent(
                          it.gateway
                        )}`}
                      >
                        {it.gateway}
                      </a>
                    </strong>
                    <br />
                    <small>{it.transactionRef}</small>
                  </td>

                  <td data-label="Initiated">
                    {formatDate(it.initiatedAt)}
                    <br />
                    <small>{timeAgo(it.initiatedAt)}</small>
                  </td>

                  <td data-label="User">
                    <strong>{it.user?.name ?? "—"}</strong>
                    <br />
                    <small>
                      {it.user?.username ? (
                        <a
                          href={`/admin/${kind}/pending?search=${encodeURIComponent(
                            it.user.username
                          )}`}
                        >
                          @{it.user.username}
                        </a>
                      ) : (
                        "—"
                      )}
                    </small>
                  </td>

                  <td data-label="Amount">
                    {formatCurrency(it.amount, it.currency)} +{" "}
                    <span className={styles.chargeText} title="charge">
                      {formatCurrency(it.fee, it.currency)}
                    </span>
                    <br />
                    <strong title="Amount with charge">
                      {formatCurrency(it.amount + it.fee, it.currency)}
                    </strong>
                  </td>

                  <td data-label="Conversion">
                    {`1 = ${it.conversion?.rate ?? 1} ${
                      it.conversion?.toCurrency ?? it.currency
                    }`}
                    <br />
                    <strong>
                      {formatCurrency(
                        (it.amount + it.fee) * (it.conversion?.rate ?? 1),
                        it.conversion?.toCurrency ?? it.currency
                      )}
                    </strong>
                  </td>

                  <td data-label="Status">
                    <span className={statusClass(it.status)}>
                      {capitalize(it.status)}
                    </span>
                  </td>

                  <td data-label="Action">
                    <a className={styles.detailsBtn} href={it.detailsUrl}>
                      <i className="la la-desktop" /> Details
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <div className={styles.summary}>
          Showing {(page - 1) * pageSize + 1} -{" "}
          {Math.min(page * pageSize, total)} of {total}
        </div>

        <div className={styles.controls}>
          <button onClick={() => setPage(1)} disabled={page === 1}>
            « First
          </button>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            ‹ Prev
          </button>

          <span className={styles.pageInfo}>
            Page {page} / {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next ›
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
          >
            Last »
          </button>
        </div>
      </div>
    </div>
  );
}

function totalPages(total: number, pageSize: number) {
  return Math.max(1, Math.ceil(total / pageSize));
}
