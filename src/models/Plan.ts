import { Schema, model, models } from "mongoose";

const PlanSchema = new Schema(
  {
    slug: { type: String, unique: true, index: true },
    title: { type: String, required: true },
    minAmount: { type: Number, required: true },
    maxAmount: { type: Number, required: true },
    cadence: {
      type: String,
      enum: ["hour", "day", "week", "month", "year", "lifetime"],
      required: true,
    },
    returns: { type: String, required: true }, // e.g. "6%" or "6 USD"
    durationUnits: { type: Number }, // e.g. 5, 7, 50, ...
    durationLabel: { type: String }, // e.g. "Hour", "Day", "Week" ... or "Lifetime"
    notes: [String],
  },
  { timestamps: true }
);
export default models.Plan || model("Plan", PlanSchema);
