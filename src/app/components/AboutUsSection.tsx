import React from "react";

function AboutUsSection() {
  const sec2Bg =
    "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/about/631d85749f9311662879092.jpg";
  return (
    <>
      <section
        className="Hero-Section h-[750px] w-full   flex items-center justify-end"
        style={{
          backgroundImage: sec2Bg ? `url(${sec2Bg})` : undefined,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionY: "-14px",
        }}
      >
        <div className="left-text mr-20 pt-20 w-2/5">
          <p className="text-white text-6xl tracking-wide leading-18">
            About <span className="text-[hsla(40,54%,56%,1)]"> Us</span>
          </p>
          <p className="text-white ">
            We are an international financial company engaged in investment
            activities, which are related to trading on financial markets and
            cryptocurrency exchanges performed by qualified professional
            traders.
            <br /> <br />
            Our goal is to provide our investors with a reliable source of high
            income, while minimizing any possible risks and offering a
            high-quality service, allowing us to automate and simplify the
            relations between the investors and the trustees. We work towards
            increasing your profit margin by profitable investment. We look
            forward to you being part of our community.
          </p>
          <button className="py-3 rounded-md mt-5 px-7 bg-[hsla(40,54%,56%,1)] hover:bg-[#CBA532]">
            More Info
          </button>
        </div>
      </section>
    </>
  );
}

export default AboutUsSection;
