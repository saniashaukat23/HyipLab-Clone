import bcrypt from "bcryptjs";
import User from "@/models/user";

export async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return; // nothing to do

  const existing = await User.findOne({ email });
  const passwordHash = await bcrypt.hash(password, 10);

  if (existing) {
    if (process.env.ADMIN_OVERWRITE_PASSWORD === "true") {
      existing.passwordHash = passwordHash;
      existing.role = "admin";
      existing.isEmailVerified = true;
      await existing.save();
      console.log(`[seedAdmin] Reset admin password for ${email}`);
    } else {
      console.log(`[seedAdmin] Admin already exists: ${email}`);
    }
    return;
  }

  await User.create({
    name: "Admin",
    email,
    passwordHash,
    role: "admin",
    isEmailVerified: true,
  });
  console.log(`[seedAdmin] Created admin ${email}`);
}
