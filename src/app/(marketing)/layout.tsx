// app/(marketing)/layout.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import animatedBg from "../components/animatedBg.module.css";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Background only for marketing */}
      <div
        className={`fixed inset-0 ${animatedBg.animatedBg} pointer-events-none -z-10`}
      >
        <div className="absolute inset-0">
          <div className={animatedBg.starsStatic} />
          <div className={animatedBg.stars1} />
          <div className={animatedBg.stars3} />
        </div>
      </div>

      <Header />
      <div className="relative z-0 pointer-events-auto">{children}</div>
      <Footer />
    </>
  );
}
