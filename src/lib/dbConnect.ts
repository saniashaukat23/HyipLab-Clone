import mongoose from "mongoose";
import { seedAdmin } from "@/lib/seedAdmin";

type Cached = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};
declare global {
  var _mongoose: Cached | undefined;
  var _seededAdmin: boolean | undefined;
}

const cached: Cached = global._mongoose || { conn: null, promise: null };

export async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI!;
    cached.promise = mongoose.connect(uri).then((m) => m);
  }
  cached.conn = await cached.promise;

  // seed once per process (dev)
  if (process.env.SEED_ADMIN_ON_STARTUP === "true" && !global._seededAdmin) {
    try {
      await seedAdmin();
    } catch (e) {
      console.error("[dbConnect] seedAdmin failed:", e);
    } finally {
      global._seededAdmin = true;
    }
  }

  global._mongoose = cached;
  return cached.conn;
}

export default dbConnect;
