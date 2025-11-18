// src/app/(dashboard)/admin/deposits/[status]/page.tsx
import PaymentsTableWrapper from "@/app/components/admin/paymentTable/PaymentTableWrapper";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { status: string };
}): Promise<Metadata> {
  return { title: `Deposits — ${params.status}` };
}

export default async function DepositStatusPage({
  params,
  searchParams,
}: {
  params: { status: string };
  // Next provides searchParams as a plain object or URLSearchParams-like, await it to satisfy the sync-dynamic-apis rule
  searchParams: Record<string, any>;
}) {
  // IMPORTANT: await searchParams before using its properties
  const sp = await Promise.resolve(searchParams);

  const statusParam = params.status === "all" ? undefined : params.status;
  const method = sp?.method;
  const search = sp?.search;

  return (
    <main style={{ padding: 16 }}>
      <h1 style={{ marginBottom: 12 }}>Deposits — {params.status}</h1>
      <PaymentsTableWrapper
        kind="deposit"
        status={statusParam}
        method={method}
        search={search}
      />
    </main>
  );
}
