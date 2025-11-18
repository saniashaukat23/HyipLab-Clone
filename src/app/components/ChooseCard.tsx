import React from "react";
interface ChooseCard {
  title: string;
  desc: string;
  icon: string;
}

const ChooseCard: React.FC<ChooseCard> = ({ title, desc, icon }) => {
  return (
    <div className="py-3 mt-6 bg-[#000000]/50 rounded-md">
      <div className="choose-card p-7 ">
        <div className="choose-card-header mb-4 flex flex-row items-center text-[hsla(40,54%,56%,1)] gap-6">
          <i className={`choose-card-icon ${icon} text-4xl`}></i>
          <p className="choose-card-title text-xl">{title}</p>
        </div>
        <p>{desc}</p>
      </div>
    </div>
  );
};
export default ChooseCard;
