// src/models/payment.ts
import mongoose, { Schema, models, model } from "mongoose";

export type PaymentKind = "deposit" | "withdrawal";
export type PaymentStatus =
  | "pending"
  | "approved"
  | "successful"
  | "rejected"
  | "initiated";

export interface IPayment extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  kind: PaymentKind;
  method?: string; // payment gateway
  transactionId?: string; // tx ref
  status: PaymentStatus;
  amount: number;
  fee?: number;
  rate?: number; // conversion rate if any
  currency?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    kind: {
      type: String,
      enum: ["deposit", "withdrawal"],
      required: true,
      index: true,
    },
    method: String,
    transactionId: String,
    status: {
      type: String,
      enum: ["pending", "approved", "successful", "rejected", "initiated"],
      default: "pending",
      index: true,
    },
    amount: { type: Number, required: true, min: 0 },
    fee: { type: Number, default: 0 },
    rate: { type: Number, default: 1 },
    currency: { type: String, default: "USD" },
  },
  { timestamps: true }
);

export default models.Payment || model<IPayment>("Payment", PaymentSchema);
