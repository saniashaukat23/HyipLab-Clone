"use client"; // for interactivity in Next.js App Router (if needed)

import React, { useState } from "react";
import styles from "./PriceCard.module.css";

interface Plan {
  id: string;
  name: string;
  fixed_amount: string;
  minimum_amount: string;
  maximum_amount: string;
}

const plans: Plan[] = [
  {
    id: "14",
    name: "Cobra",
    fixed_amount: "1000.00000000",
    minimum_amount: "0.00000000",
    maximum_amount: "0.00000000",
  },
  {
    id: "13",
    name: "Elephant",
    fixed_amount: "0.00000000",
    minimum_amount: "500.00000000",
    maximum_amount: "1000.00000000",
  },
  {
    id: "12",
    name: "Crown",
    fixed_amount: "0.00000000",
    minimum_amount: "200.00000000",
    maximum_amount: "5000.00000000",
  },
  {
    id: "11",
    name: "Silver",
    fixed_amount: "500.00000000",
    minimum_amount: "0.00000000",
    maximum_amount: "0.00000000",
  },
  {
    id: "10",
    name: "Black Horse",
    fixed_amount: "0.00000000",
    minimum_amount: "500.00000000",
    maximum_amount: "5000.00000000",
  },
  {
    id: "9",
    name: "Life Time",
    fixed_amount: "0.00000000",
    minimum_amount: "100.00000000",
    maximum_amount: "500.00000000",
  },
  {
    id: "8",
    name: "Gold",
    fixed_amount: "200.00000000",
    minimum_amount: "0.00000000",
    maximum_amount: "0.00000000",
  },
  {
    id: "7",
    name: "Platinum",
    fixed_amount: "0.00000000",
    minimum_amount: "100.00000000",
    maximum_amount: "5000.00000000",
  },
  {
    id: "6",
    name: "Slivesto",
    fixed_amount: "200.00000000",
    minimum_amount: "0.00000000",
    maximum_amount: "0.00000000",
  },
];

const InvestmentCalculator: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[0]);

  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = plans.find((plan) => plan.id === e.target.value);
    if (selected) setSelectedPlan(selected);
  };

  const getDisplayAmount = (): string => {
    const fixed = parseFloat(selectedPlan.fixed_amount);
    const min = parseFloat(selectedPlan.minimum_amount);
    const max = parseFloat(selectedPlan.maximum_amount);

    if (fixed > 0) return `$${fixed.toFixed(2)}`;
    if (min > 0 || max > 0) return `$${min.toFixed(2)} - $${max.toFixed(2)}`;
    return "N/A";
  };

  return (
    <div
      className={` ${styles.pricecard} calculator bg-black w-8/12  flex justify-center items-center relative z-10 p-12 rounded-md`}
    >
      <div className="grid grid-cols-2 w-full  gap-10">
        <div className="choose-plan py-3 mb-4 text-white flex flex-col">
          <label className="mb-2.5">Choose Plan</label>
          <select
            name="plans-list"
            id=""
            className="py-3 px-5 bg-[hsla(40,54%,56%,1)] rounded-sm"
          >
            <option value="cobra">Cobra</option>
            <option value="Libra relative z-10">Libra</option>
          </select>
        </div>
        <div className="invest-amount py-3 mb-4 text-white flex flex-col">
          <label htmlFor="plans-list" className="mb-2.5">
            Invest Amount
          </label>
          <input
            type="text"
            placeholder="$1000"
            className="py-2.5 px-5 border-[hsla(40,54%,56%,1)] border-1 bg-[#383838] text-white  rounded-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculator;
