"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const logos = [
  "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/we_accept/63319095f3d411664192661.jpg",
  "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/we_accept/6331909d64be71664192669.jpg",
  "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/we_accept/633190a588df71664192677.jpg",
  "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/we_accept/633190ad89c261664192685.jpg",
  "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/we_accept/633190b56702e1664192693.jpg",
  "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/we_accept/633190beae8061664192702.jpg",
  "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/we_accept/633190c81d2361664192712.jpg",
  "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/we_accept/633190d1715f71664192721.jpg",
  "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/we_accept/633190dadd0f81664192730.jpg",
  "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/we_accept/633190e5aa7371664192741.jpg",
  "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/we_accept/633190f8ef6061664192760.jpg",
  "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/we_accept/63319103114611664192771.jpg",
  "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/we_accept/6331910d5ef4e1664192781.jpg",
  "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/we_accept/633191199cfcb1664192793.jpg",
  "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/we_accept/633191261ce231664192806.jpg",
  "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/we_accept/6331912f34a631664192815.jpg",
];

export default function PaymentSlider() {
  return (
    <div className="w-full max-w-screen-xl mx-auto py-8">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={24}
        slidesPerView={6}
        loop
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 3 },
          640: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
        }}
      >
        {logos.map((src, idx) => (
          <SwiperSlide
            key={idx}
            className="flex justify-center border-2 border-[hsla(40,54%,56%,0.5)]  items-center rounded-sm"
          >
            <div className="brand-item w-[190px] h-[140px] flex items-center justify-center bg-black">
              <img
                src={src}
                alt={`logo-${idx}`}
                className="max-h-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
