import React from "react";

interface SectionHeadProps {
  title: string;
  title2: string;
  description: string;
}

function SectionHead({ title, description, title2 }: SectionHeadProps) {
  return (
    <div className=" flex flex-col justify-center items-center gap-8 text-white">
      <div className=" text-4xl">
        {title} <span className="text-[hsla(40,54%,56%,1)]">{title2}</span>{" "}
      </div>
      <div className=" text-center w-1/2">{description}</div>
    </div>
  );
}

export default SectionHead;
