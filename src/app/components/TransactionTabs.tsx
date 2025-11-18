// components/TransactionTabs.tsx
"use client";
import styles from "./PriceCard.module.css";
import React, { useState } from "react";

interface Transaction {
  name: string;
  date: string;
  amount: string;
  method: string;
}

const deposits: Transaction[] = [
  {
    name: "User Name",
    date: "2025-07-01",
    amount: "1000 USD",
    method: "Stripe Hosted",
  },
  {
    name: "Desirae Wood",
    date: "2025-05-05",
    amount: "10000 USD",
    method: "Stripe Hosted",
  },
  {
    name: "Email Offiece",
    date: "2025-04-27",
    amount: "500 USD",
    method: "Stripe Hosted",
  },
  {
    name: "SERHII CHAPLINSKYI",
    date: "2025-04-21",
    amount: "1000 USD",
    method: "Stripe Hosted",
  },
  {
    name: "Prince Biswas",
    date: "2025-04-03",
    amount: "200 USD",
    method: "RazorPay",
  },
  {
    name: "Hlzlg lyca Lyslgscls",
    date: "2025-03-31",
    amount: "200 USD",
    method: "Stripe Hosted",
  },
  {
    name: "Hlzlg lyca Lyslgscls",
    date: "2025-03-31",
    amount: "333 USD",
    method: "Stripe Hosted",
  },
  {
    name: "GG GG",
    date: "2025-03-29",
    amount: "10000 USD",
    method: "Stripe Hosted",
  },
  {
    name: "Youssouf Dabo",
    date: "2025-03-14",
    amount: "200 USD",
    method: "Mollie",
  },
  {
    name: "User Name",
    date: "2025-03-11",
    amount: "100 USD",
    method: "Stripe Hosted",
  },
];

const withdrawals: Transaction[] = [
  {
    name: "Raphael Rush",
    date: "2022-09-21",
    amount: "365 USD",
    method: "Bank Wire",
  },
  {
    name: "Eve Hawkins",
    date: "2022-09-21",
    amount: "245 USD",
    method: "Mobile Banking",
  },
  {
    name: "Ruth Herman",
    date: "2022-09-21",
    amount: "412 USD",
    method: "Bank Transfer",
  },
  {
    name: "Glenna Mcdowell",
    date: "2022-09-21",
    amount: "325 USD",
    method: "Coin Transfer",
  },
  {
    name: "Hilda Baird",
    date: "2022-09-21",
    amount: "365 USD",
    method: "Mobile Banking",
  },
  {
    name: "Benjamin Santos",
    date: "2022-09-21",
    amount: "120 USD",
    method: "Bank Wire",
  },
  {
    name: "User Name",
    date: "2020-12-06",
    amount: "100 USD",
    method: "Mobile Money",
  },
];

export default function TransactionTabs() {
  const [active, setActive] = useState<"deposit" | "withdraw">("deposit");

  const data = active === "deposit" ? deposits : withdrawals;
  const headers =
    active === "deposit"
      ? ["Name", "Date", "Amount", "Gateway"]
      : ["Name", "Date", "Amount", "Method"];

  return (
    <div className="col-span-full mx-28 mt-10">
      <div className="flex justify-center space-x-4">
        <button
          className={`py-2 px-5 font-normal rounded-sm  text-white ${
            active === "deposit"
              ? "bg-[hsla(40,54%,56%,1)] "
              : "border-[1px] border-[hsla(40,54%,56%,1)]"
          }`}
          onClick={() => setActive("deposit")}
        >
          Latest Deposit
        </button>
        <button
          className={`py-2 px-5 font-normal rounded-sm  text-white ${
            active === "withdraw"
              ? "bg-[hsla(40,54%,56%,1)] "
              : "border-[1px] border-[hsla(40,54%,56%,1)]"
          }`}
          onClick={() => setActive("withdraw")}
        >
          Latest Withdraw
        </button>
      </div>
      {/* Table */}
      <div
        className={`mt-4 overflow-x-auto rounded-lg ${styles.cusTransaction}`}
      >
        <table className={`min-w-full text-white`}>
          <thead className="rounded-lg">
            <tr className="bg-[hsla(40,54%,56%,1)] ">
              {headers.map((h, idx) => (
                <th
                  key={h}
                  className={
                    "text-left py-2.5 px-5 text-sm font-semibold " +
                    (idx === 0
                      ? "rounded-tl-lg"
                      : idx === headers.length - 1
                      ? "rounded-tr-lg"
                      : "")
                  }
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((tx, i) => {
              const isLast = i === data.length - 1;
              return (
                <tr
                  key={i}
                  className={"bg-black border-b-[1px] border-[#ffffff57]"}
                >
                  <td
                    data-label={headers[0]}
                    className={
                      "py-4 px-5 text-sm " + (isLast ? "rounded-bl-lg" : "")
                    }
                  >
                    {tx.name}
                  </td>
                  <td data-label={headers[1]} className="py-4 px-5 text-sm">
                    {tx.date}
                  </td>
                  <td data-label={headers[2]} className="py-4 px-5 text-sm">
                    {tx.amount}
                  </td>
                  <td
                    data-label={headers[3]}
                    className={
                      "py-4 px-5 text-sm " + (isLast ? "rounded-br-lg" : "")
                    }
                  >
                    {tx.method}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
