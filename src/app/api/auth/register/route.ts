// app/api/register/route.ts  (or app/api/auth/register/route.ts)
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect"; // use named import (or make sure your file exports default+named)
import User from "@/models/user"; // match filename casing
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = (await req.json()) as {
      name?: string;
      email: string;
      password: string;
    };

    // 1) Validate
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // 2) DB connect
    await dbConnect();

    // 3) Uniqueness check
    const existing = await User.findOne({ email }).lean();
    if (existing) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // 4) Hash + create
    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({
      name: name ?? "",
      email,
      passwordHash, // <- store the hash, not the raw password
      role: "user", // defaults are fine too
      isEmailVerified: false,
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
