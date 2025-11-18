import { Schema, model, models, Types } from "mongoose";

const WithdrawalSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", index: true, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
    method: String,
    dest: String,
  },
  { timestamps: true }
);

export default models.Withdrawal || model("Withdrawal", WithdrawalSchema);
