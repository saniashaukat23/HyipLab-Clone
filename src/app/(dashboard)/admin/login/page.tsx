"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import styles from "./login.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") ?? "/admin/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const res = await signIn("credentials", {
      email, // MUST match your Credentials keys
      password,
      redirect: false,
      callbackUrl: next,
    });
    console.log("signIn result:", res);

    setSubmitting(false);

    if (!res || res.error) {
      setError(
        res?.error === "CredentialsSignin"
          ? "Invalid email or password"
          : "Something went wrong"
      );
      return;
    }

    router.push(res.url || next);
  };

  return (
    <div
      className={styles.loginMain}
      style={{
        backgroundImage:
          "url('https://script.viserlab.com/hyiplab/demo/assets/admin/images/login.jpg')",
        backgroundPosition: "top -100px",
      }}
    >
      <div className={styles.loginArea}>
        <div className={styles.loginWrapperTop}>
          <h3 className={styles.title}>
            Welcome to <strong>HYIPLab</strong>
          </h3>
          <p className={styles.subtitle}>Admin Login to HYIPLab Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formContent}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                id="email"
                type="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className={styles.formGroup}>
              <div className="flex justify-between">
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <a href="#" className={styles.forgot}>
                  Forgot Password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            {error && <p style={{ color: "#e74c3c", marginTop: 8 }}>{error}</p>}

            <button
              type="submit"
              className={styles.button}
              disabled={submitting}
            >
              {submitting ? "LOGGING IN..." : "LOGIN"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
