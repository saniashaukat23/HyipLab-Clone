import mongoose, { Schema, models, model } from "mongoose";

export type UserRole = "user" | "admin";

export interface IUser extends mongoose.Document {
  name?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  isEmailVerified: boolean;
  kycStatus?: "unverified" | "pending" | "verified";
  balance?: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: String,
    email: { type: String, unique: true, required: true, index: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      index: true,
    },
    isEmailVerified: { type: Boolean, default: false },
    kycStatus: {
      type: String,
      enum: ["unverified", "pending", "verified"],
      default: "unverified",
    },
    balance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default (models?.User as any) || model<IUser>("User", UserSchema);
