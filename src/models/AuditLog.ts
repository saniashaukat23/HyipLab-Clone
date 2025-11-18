import { Schema, model, models, Types } from "mongoose";

const AuditLogSchema = new Schema(
  {
    actorId: { type: Types.ObjectId, ref: "User", index: true },
    action: { type: String, required: true }, // e.g. INVESTMENT_APPROVED
    targetType: { type: String }, // investment/deposit/withdrawal/user
    targetId: { type: Types.ObjectId },
    meta: Schema.Types.Mixed,
  },
  { timestamps: true }
);

export default models.AuditLog || model("AuditLog", AuditLogSchema);
