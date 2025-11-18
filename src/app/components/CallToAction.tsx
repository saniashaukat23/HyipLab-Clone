"use client";
import React from "react";
import styles from "./PriceCard.module.css"; // if cusShadow is defined here

export default function CallToAction() {
  return (
    <section className="flex justify-center pb-28">
      <div
        className={`w-2/3 p-10 rounded-xl text-center bg-cover bg-center ${styles.cusShadow}`}
        style={{
          backgroundImage:
            "url(https://script.viserlab.com/hyiplab/demo/assets/images/frontend/cta/631c9f3d446e11662820157.jpg)",
        }}
      >
        <h2 className="text-3xl font-bold text-white mb-5">
          Get Started Today With Us
        </h2>
        <p className="text-white mx-10">
          This is a Revolutionary Money Making Platform! Invest for Future in
          Stable Platform and Make Fast Money. Not only we guarantee the fastest
          and the most exciting returns on your investments, but we also
          guarantee the security of your investment.
        </p>
        <a
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-[hsla(40,54%,56%,1)] text-white font-medium rounded hover:bg-[#CBA532] transition"
        >
          Join Us
        </a>
      </div>
    </section>
  );
}
