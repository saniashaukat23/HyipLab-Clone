// src/models/investment.ts
import mongoose, { Schema, models, model } from "mongoose";

export type InvestmentStatus = "active" | "closed" | "pending" | "cancelled";

export interface IInvestment extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  planId?: mongoose.Types.ObjectId;
  amount: number; // principal invested
  interest?: number; // interest earned (optional)
  profit?: number; // total profit paid (optional)
  status: InvestmentStatus;
  createdAt: Date;
  updatedAt: Date;
}

const InvestmentSchema = new Schema<IInvestment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    planId: { type: Schema.Types.ObjectId, ref: "Plan" },
    amount: { type: Number, required: true, min: 0 },
    // prefer storing interest/profit separately if possible
    interest: { type: Number, default: 0, min: 0 },
    profit: { type: Number, default: 0, min: 0 },
    status: {
      type: String,
      enum: ["active", "closed", "pending", "cancelled"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true }
);

// Make sure filename & imports use the same casing
export default models.Investment ||
  model<IInvestment>("Investment", InvestmentSchema);
