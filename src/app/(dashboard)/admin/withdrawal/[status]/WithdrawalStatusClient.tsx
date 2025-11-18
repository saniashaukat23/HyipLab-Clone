// src/app/(dashboard)/admin/withdrawal/[status]/WithdrawalStatusClient.tsx
"use client";

import PaymentsTableWrapper from "@/app/components/admin/paymentTable/PaymentTableWrapper";

export default function WithdrawalStatusClient({
  status,
  method,
  search,
}: {
  status?: string;
  method?: string;
  search?: string;
}) {
  return (
    <PaymentsTableWrapper
      kind="withdrawal"
      status={status}
      method={method}
      search={search}
    />
  );
}
