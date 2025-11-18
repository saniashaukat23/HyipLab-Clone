// app/components/Header.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { User } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 200);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const Logo =
    "https://script.viserlab.com/hyiplab/demo/assets/images/logo_icon/logo_bit_gold.png";
  return (
    <div
      className={`
      fixed inset-x-0 top-0 z-50 flex items-center justify-between
      py-6 px-6 transition-colors duration-300
      ${scrolled ? "bg-black border-b border-[#ffffff57]" : "bg-black/50"}
    `}
    >
      <div className="nav-logo">
        <img src={Logo} alt="logo" style={{ maxWidth: 200 }} />
      </div>
      <div className="nav-link flex gap-14 ">
        <div className="self-center gap-12 flex text-white">
          <Link href="/">Home</Link>
          <Link href="/about">about</Link>
          <Link href="/plan">plan</Link>
          <Link href="/blog">blog</Link>
          <Link href="/contact">contact</Link>
        </div>
        <Link
          href="/login"
          className="icon h-11 w-11 bg-[hsla(40,54%,56%,1)] rounded-md flex justify-center "
        >
          <User className="self-center text-white" />
        </Link>
      </div>
    </div>
  );
}
