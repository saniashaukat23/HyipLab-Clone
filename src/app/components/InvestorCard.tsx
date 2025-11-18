import React from "react";

export interface Investor {
  rank: string;
  fullName: string;
  username: string;
  investment: string;
}

const InvestorCard: React.FC<{ investor: Investor }> = ({ investor }) => (
  <div
    className="
      group
      bg-[#343a40] 
      text-white 
      p-6 
      rounded-md 
      shadow-lg 
      flex 
      flex-col 
      overflow-hidden  
      relative 
      transform 
      transition-transform 
      duration-300 
      ease-out 
      hover:-translate-y-2
    "
  >
    <div className="flex gap-14 justify-between">
      <p className="text-md font-semibold ">{investor.fullName}</p>
      <span
        className="
          text-2xl 
          font-bold 
          mb-2 
          text-[#ffffff36] 
          relative 
          -top-3
          transform 
          transition-transform 
          duration-300 
          ease-out
          group-hover:-translate-z-2
                    group-hover:-translate-x-2

          group-hover:scale-110
          group-hover:text-[hsla(40,54%,56%,1)]
        "
      >
        {investor.rank}
      </span>
    </div>
    <p className="text-sm mb-2">{investor.username}</p>
    <span className="text-sm text-[hsla(40,54%,56%,1)] font-bold">
      Investment - {investor.investment}
    </span>

    <div
      className={`
        h-24 
        w-24 
        bg-[hsla(40,54%,56%,0.2)] 
        absolute 
        -bottom-9 
        -right-4  
        -rotate-[38deg]
        transition-transform duration-300 ease-out
        group-hover:-translate-y-2
      `}
      style={{
        borderRadius: "46% 54% 55% 45% / 35% 38% 62% 65%",
      }}
    />
  </div>
);

export default InvestorCard;
