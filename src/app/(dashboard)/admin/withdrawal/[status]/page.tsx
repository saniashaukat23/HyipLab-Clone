import type { Metadata } from "next";
import WithdrawalStatusClient from "./WithdrawalStatusClient";

export async function generateMetadata({
  params,
}: {
  params: { status: string };
}): Promise<Metadata> {
  return { title: `Withdrawals — ${params.status}` };
}

export default function WithdrawalStatusPage({
  params,
  searchParams,
}: {
  params: { status: string };
  searchParams: { method?: string; search?: string };
}) {
  const statusParam = params.status === "all" ? undefined : params.status;

  return (
    <main style={{ padding: 16 }}>
      <h1 style={{ marginBottom: 12 }}>Withdrawals — {params.status}</h1>
      <WithdrawalStatusClient
        status={statusParam}
        method={searchParams?.method}
        search={searchParams?.search}
      />
    </main>
  );
}
