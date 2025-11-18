// src/components/admin/PaymentsTable/PaymentsTableWrapper.tsx
"use client";
import PaymentsTable from "./PaymentTable";

export default function PaymentsTableWrapper(props: {
  kind?: "deposit" | "withdrawal";
  status?: string;
  method?: string;
  search?: string;
}) {
  return <PaymentsTable {...props} />;
}
