import React from "react";
import styles from "./PriceCard.module.css";
interface PriceCardProps {
  title: string;
  price: string;
  features: string[];
  backgroundImage: string;
}

const PriceCard: React.FC<PriceCardProps> = ({
  title,
  price,
  features,
  backgroundImage,
}) => {
  return (
    <div
      className={`${styles.pricecard}  relative z-10 rounded-md`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "left -10%",
      }}
    >
      <div className="text-center p-8">
        <p className="Package-card-title mb-2 text-[hsla(40,54%,56%,1)] text-2xl font-bold">
          {title}
        </p>
        <ul className="Package-feature-lists mt-6 text-white text-lg">
          {features.map((feature, index) => (
            <li
              key={index}
              className="py-2.5 border-b border-[hsla(40,54%,56%,0.35)]"
            >
              {feature}
            </li>
          ))}
        </ul>
        <div className="package-range mt-12 text-[hsla(40,54%,56%,1)] text-xl font-bold">
          {price}
        </div>
        <button className="py-3 rounded-md mt-8 px-7 bg-[hsla(40,54%,56%,1)] hover:bg-[#CBA532]">
          Invest Now
        </button>
      </div>
    </div>
  );
};

export default PriceCard;
