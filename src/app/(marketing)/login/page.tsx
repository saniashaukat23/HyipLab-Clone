"use client";

import PageBanner from "@/app/components/PageBanner";
import Link from "next/link";
import { useState } from "react";
import styles from "../../components/auth.module.css";
import SectionHead from "@/app/components/SectionHead";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPw] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") ?? "/";

  const bg =
    "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/login/631ca0dc080a31662820572.jpg";
  const headerBg =
    "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/login/631ca0dc2ed1a1662820572.jpg";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      // Map "Username or Email" to the credentials field your Provider expects.
      // If your CredentialsProvider uses "email", we pass username as email.
      const res = await signIn("credentials", {
        email: username.trim(), // or change to "username" if your provider uses that key
        password,
        redirect: false,
        // You can persist "remember" via a cookie yourself if needed.
        callbackUrl: next,
      });

      if (!res || res.error) {
        setError(
          res?.error === "CredentialsSignin"
            ? "Invalid email/username or password."
            : "Something went wrong. Please try again."
        );
        return;
      }

      router.push(res.url || next);
    } finally {
      setLoading(false);
    }
  }

  const handleSocial = (provider: "google" | "facebook" | "linkedin") => {
    // Ensure you have these providers configured in [...nextauth]/route.ts
    signIn(provider, { callbackUrl: next });
  };

  return (
    <>
      <PageBanner title="Login" />
      <section
        className={styles.bgSection}
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className={styles.loginSection}>
          <div className={styles.shade}></div>
          <div className={styles.loginContent}>
            <div
              className={styles.sectionHead}
              style={{ backgroundImage: `url(${headerBg})` }}
            >
              <div className={styles.sectionTitle}>
                Welcome To <span> HYIPLAB</span>
              </div>
              <div className={styles.details}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus
                distinctio deserunt impedit similique debitis voluptatum enim.
              </div>
            </div>

            <div className={styles.loginLinks}>
              <button
                type="button"
                className={styles.loginButtons}
                onClick={() => handleSocial("google")}
                disabled={loading}
              >
                <img
                  src="https://script.viserlab.com/hyiplab/demo/assets/global/images/google.svg"
                  alt=""
                />
                Login with Google
              </button>
              <button
                type="button"
                className={styles.loginButtons}
                onClick={() => handleSocial("facebook")}
                disabled={loading}
              >
                <img
                  src="https://script.viserlab.com/hyiplab/demo/assets/global/images/facebook.svg"
                  alt=""
                />
                Login with Facebook
              </button>
              <button
                type="button"
                className={styles.loginButtons}
                onClick={() => handleSocial("linkedin")}
                disabled={loading}
              >
                <img
                  src="https://script.viserlab.com/hyiplab/demo/assets/global/images/linkedin.svg"
                  alt=""
                />
                Login with Linkedin
              </button>
              <button
                type="button"
                className={styles.loginButtons}
                // TODO: wire MetaMask/SIWE separately (not a NextAuth default)
                onClick={() => setError("MetaMask login not configured yet.")}
                disabled={loading}
              >
                <img
                  src="https://script.viserlab.com/hyiplab/demo/assets/templates/bit_gold/images/metamask.png"
                  alt=""
                />
                Login with MetaMask
              </button>
            </div>

            <div className="text-center text-white mt-4">
              <span>OR</span>
            </div>
          </div>
        </div>

        <div className={styles.loginSection2}>
          {error && <div className="mb-4 text-red-500">{error}</div>}

          <form onSubmit={onSubmit}>
            <div className={styles.FormEvents}>
              <label className={styles.FormLabel}>Username or Email</label>
              <input
                value={username}
                className={styles.FormInput}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username email"
                placeholder="you@example.com"
              />
            </div>

            <div className={styles.FormEvents}>
              <div className="flex justify-between">
                <label className={styles.FormLabel}>Password</label>
                <Link className={styles.link} href="/password/reset">
                  Forgot your password?
                </Link>
              </div>
              <input
                type="password"
                className={styles.FormInput}
                value={password}
                onChange={(e) => setPw(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••"
              />
            </div>

            <div className="flex flex-col">
              <label className={styles.rememberMe}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <p>Remember Me</p>
              </label>

              <button
                className={styles.loginButtons}
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in…" : "Login"}
              </button>

              <p>
                Don&apos;t have any account?{" "}
                <Link href="/register" className={styles.link}>
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
