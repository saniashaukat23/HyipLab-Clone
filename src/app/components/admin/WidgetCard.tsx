"use client";

import Link from "next/link";
import styles from "./WidgetCard.module.css";

type Color = "primary" | "success" | "danger" | "warning";
type BGColor = "primaryBG" | "successBG" | "dangerBG" | "warningBG";

export default function WidgetCard({
  href,
  iconClass,
  amount,
  title,
  color = "primary",
  BGColor = "primaryBG",
}: {
  href: string;
  iconClass: string; // e.g. "fas fa-hand-holding-usd"
  amount: string | number; // "$1,149,261.00" or 2785
  title: string; // "Total Deposited"
  color?: Color; // card accent (applies to outer card)
  BGColor?: BGColor; // icon wrapper background (translucent)
}) {
  // safe classname access from CSS module
  const colorClass = styles[color];
  const bgClass = styles[BGColor];

  return (
    <Link href={href} className={styles.link}>
      <div className={`${styles.card} ${colorClass}`}>
        <div className={styles.left}>
          <div className={styles.row}>
            <span className={`${styles.iconWrap} ${bgClass}`}>
              <i className={iconClass + " " + styles.icon} aria-hidden="true" />
            </span>
          </div>

          <div className={styles.body}>
            <h3 className={styles.value}>{amount}</h3>
            <p className={styles.title}>{title}</p>
          </div>
        </div>

        <span className={styles.chev}>
          <i className="fas fa-chevron-right" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
