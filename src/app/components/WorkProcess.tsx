import SectionHead from "./SectionHead";
import { workCards } from "../data/file";
import React from "react";
import styles from "./PriceCard.module.css";
const sec4Bg =
  "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/how_work/631ca042137ab1662820418.jpg";
const WorkProcess: React.FC = () => (
  <>
    <section
      className="Hero-Section py-28 w-full relative "
      style={{
        backgroundImage: `url(${sec4Bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "140%",
        backgroundPosition: "center top 10%",
      }}
    >
      <SectionHead
        title="How"
        title2="Hyiplab Works"
        description="Get involved in our tremendous platform and Invest. We will utilize your money and give you profit in your wallet automatically."
      />

      <div className="grid grid-cols-3 mx-16 relative z-20">
        {workCards.map((c) => (
          <div
            key={c.step}
            className="py-3 mt-12 flex flex-col justify-center items-center"
          >
            <div
              className={`h-26 w-26 bg-black ${styles.pricecard} rounded-full flex justify-center items-center relative`}
            >
              <i className={`${c.icon} text-[hsla(40,54%,56%,1)] text-4xl`} />
              <div className="h-8 w-8 bg-black border-2 border-[hsla(40,54%,56%,1)] text-[hsla(40,54%,56%,1)] flex justify-center items-center rounded-full absolute -right-1 -top-1">
                <span>{c.step}</span>
              </div>
            </div>
            <p className="text-[hsla(40,54%,56%,1)] text-xl font-bold mt-5">
              {c.text}
            </p>
          </div>
        ))}
      </div>

      <div
        className="absolute left-[20%] bottom-[40%] w-[60%] h-px"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, hsla(40,54%,56%,1) 0, hsla(40,54%,56%,1) 3px, transparent 3px, transparent 6px)",
        }}
      />
    </section>
  </>
);

export default WorkProcess;
