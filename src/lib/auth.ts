// src/lib/auth.ts
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/user";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(creds) {
        const email = creds?.email?.toLowerCase().trim();
        const password = String(creds?.password ?? "");
        if (!email || !password) return null;

        await dbConnect();
        const u = await User.findOne({ email });
        if (!u) return null;

        let ok = false;
        if (u.passwordHash) {
          ok = await bcrypt.compare(password, u.passwordHash);
        }

        if (!ok) return null;

        return {
          id: String(u._id),
          email: u.email,
          name: u.name ?? "",
          role: u.role ?? "user",
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as any).uid = (user as any).id;
        (token as any).role = (user as any).role ?? "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = (token as any).uid;
        (session.user as any).role = (token as any).role ?? "user";
      }
      return session;
    },
  },
};
