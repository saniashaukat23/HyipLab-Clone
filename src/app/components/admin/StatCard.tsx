import Link from "next/link";
import styles from "./admin.module.css";

type Color =
  | "primary"
  | "success"
  | "danger"
  | "warning"
  | "blue"
  | "green"
  | "orange"
  | "purple";
type BGColor = "primaryBG" | "successBG" | "dangerBG" | "warningBG" | "";

export default function StatCard({
  title,
  value,
  iconClass,
  href,
  color = "primary",
  BGColor = "",
}: {
  title: string;
  value: number | string;
  iconClass: string;
  href: string;
  color?: Color;
  BGColor?: BGColor;
}) {
  return (
    <Link href={href} className={styles.link}>
      <div className={`${styles.card} ${styles[color]}`}>
        <div className={styles.left}>
          <div className={styles.row}>
            <span className={`${styles.iconWrap} ${styles[BGColor]}`}>
              <i className={iconClass} style={{ fontSize: 22 }} />
            </span>
          </div>
          <div className={styles.body}>
            <p className={styles.title}>{title}</p>
            <h3 className={styles.value}>{value}</h3>
          </div>
        </div>
        <span>
          <i
            className="fas fa-chevron-right text-black"
            style={{ fontSize: 16 }}
          />
        </span>
      </div>
    </Link>
  );
}
