"use client";

import React from "react";

interface FooterProps {
  backgroundUrl?: string;
  logoUrl?: string;
  privacyHref?: string;
  termsHref?: string;
  year?: number;
  siteHref?: string;
  siteName?: string;
  socialLinks?: { iconClass: string; href: string }[];
}

export default function Footer({
  backgroundUrl = "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/footer/631ca001534431662820353.jpg",
  logoUrl = "https://script.viserlab.com/hyiplab/demo/assets/images/logo_icon/logo_bit_gold.png",
  privacyHref = "/policy/privacy-policy",
  termsHref = "/policy/terms-and-service",
  year = new Date().getFullYear(),
  siteHref = "/",
  siteName = "HYIPLab",
  socialLinks = [
    { iconClass: "lab la-facebook-f", href: "https://facebook.com" },
    { iconClass: "lab la-twitter", href: "https://twitter.com" },
    { iconClass: "fab fa-pinterest-p", href: "https://pinterest.com" },
    { iconClass: "lab la-linkedin-in", href: "https://linkedin.com" },
  ],
}: FooterProps) {
  return (
    <footer
      className="bg-cover bg-center text-white border-t border-[hsla(40,54%,56%,1)]"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundPosition: "top ",
      }}
    >
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <a href={siteHref} className="inline-block mb-4">
            <img src={logoUrl} alt="logo" className="mx-auto h-10" />
          </a>
          <ul className="flex flex-wrap justify-center gap-6">
            <li>
              <a href={privacyHref} className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href={termsHref} className="hover:underline">
                Terms &amp; Service
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-black bg-opacity-50 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm">
          <p className="mb-4 md:mb-0">
            © {year}{" "}
            <a
              href={siteHref}
              className="text-[hsla(40,54%,56%,1)] hover:underline"
            >
              {siteName}
            </a>
            . All Rights Reserved
          </p>
          <ul className="flex gap-4">
            {socialLinks.map((s, idx) => (
              <li key={idx}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  <i
                    className={`${s.iconClass} text-xl hover:text-[hsla(40,54%,56%,1)]`}
                  ></i>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
