import { Schema, model, models, Types } from "mongoose";

const DepositSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", index: true, required: true },
    amount: { type: Number, required: true },
    txRef: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "successful", "initiated"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true }
);

export default models.Deposit || model("Deposit", DepositSchema);
