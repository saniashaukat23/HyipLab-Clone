"use client";

import PageBanner from "@/app/components/PageBanner";
import Link from "next/link";
import { useState } from "react";
import styles from "../../components/auth.module.css";

export default function RegisterPage() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!firstname || !lastname || !email || !password || !confirmPw) {
      return setError("All fields are required.");
    }
    if (password !== confirmPw) {
      return setError("Passwords don’t match.");
    }
    if (!agree) {
      return setError("You must agree to the Terms & Privacy Policy.");
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });

      const data = await res.json();
      if (!res.ok) setError(data.error || "Registration failed");
      else window.location.href = "/login";
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageBanner title="Register" />
      <section className={`${styles.bgSection}`}>
        {/* LEFT SIDE: Welcome + Social Logins */}
        <div className={`${styles.RegisterSection}`}>
          <div className={`${styles.shade}`}></div>
          <div className={`${styles.loginContent}`}>
            <div className={`${styles.sectionHead}`}>
              <div className={`${styles.sectionTitle}`}>
                Welcome To <span>HYIPLAB</span>
              </div>
              <div className={`${styles.details}`}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus
                distinctio deserunt impedit similique debitis voluptatum enim.
              </div>
            </div>

            <div className={`${styles.loginLinks}`}>
              <button className={`${styles.loginButtons}`}>
                <img
                  src="https://script.viserlab.com/hyiplab/demo/assets/global/images/google.svg"
                  alt=""
                />
                Register with Google
              </button>
              <button className={`${styles.loginButtons}`}>
                <img
                  src="https://script.viserlab.com/hyiplab/demo/assets/global/images/facebook.svg"
                  alt=""
                />
                Register with Facebook
              </button>
              <button className={`${styles.loginButtons}`}>
                <img
                  src="https://script.viserlab.com/hyiplab/demo/assets/global/images/linkedin.svg"
                  alt=""
                />
                Register with Linkedin
              </button>
              <button className={`${styles.loginButtons}`}>
                <img
                  src="https://script.viserlab.com/hyiplab/demo/assets/templates/bit_gold/images/metamask.png"
                  alt=""
                />
                Register with MetaMask
              </button>
            </div>

            <div className="text-center text-white mt-4">
              <span>OR</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Registration Form */}
        <div className={`${styles.RegisterSection2}`}>
          {error && <div className="mb-4 text-red-500">{error}</div>}

          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className={`${styles.FormEvents}`}>
                <label className={`${styles.FormLabel}`}>First Name</label>
                <input
                  className={`${styles.FormInput}`}
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className={`${styles.FormEvents}`}>
                <label className={`${styles.FormLabel}`}>Last Name</label>
                <input
                  className={`${styles.FormInput}`}
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className={`${styles.FormEvents}`}>
              <label className={`${styles.FormLabel}`}>Email</label>
              <input
                type="email"
                className={`${styles.FormInput}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className={`${styles.FormEvents}`}>
                <label className={`${styles.FormLabel}`}>Password</label>
                <input
                  type="password"
                  className={`${styles.FormInput}`}
                  value={password}
                  onChange={(e) => setPw(e.target.value)}
                />
              </div>
              <div className={`${styles.FormEvents}`}>
                <label className={`${styles.FormLabel}`}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  className={`${styles.FormInput}`}
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                />
              </div>
            </div>

            <label className={`${styles.rememberMe}`}>
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <p>
                I agree with{" "}
                <Link
                  className={`${styles.link}`}
                  href="/policy/privacy-policy"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
                ,{" "}
                <Link
                  className={`${styles.link}`}
                  href="/policy/terms-and-service"
                  target="_blank"
                >
                  Terms & Service
                </Link>
              </p>
            </label>

            <button
              className={`${styles.loginButtons}`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering…" : "Register"}
            </button>

            <p className="mt-2">
              Already have an account?{" "}
              <Link href="/login" className={`${styles.link}`}>
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
