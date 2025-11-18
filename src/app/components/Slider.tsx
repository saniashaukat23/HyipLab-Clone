// components/TestimonialSlider.tsx
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Legit....and legit. Although the payment was processed manually, I have received my first payment within a very short time., I think nice for invest at this site.",
    name: "Samantha Levy",
    designation: "User From USA",
    avatar:
      "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/testimonial/631d7e52d2dcf1662877266.jpg",
  },
  {
    quote:
      "I have invested with this platform and gotten my money in my account. This is legit and safe. Great doing business with them.",
    name: "Geoffrey Crawford",
    designation: "User From Nigeria",
    avatar:
      "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/testimonial/631d7e6f11faf1662877295.jpg",
  },
  {
    quote:
      "Legit....and legit. Although the payment was processed manually, I have received my first payment within a very short time., I think nice for invest at this site.",
    name: "David Doe",
    designation: "User From England",
    avatar:
      "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/testimonial/633edd66c19231665064294.jpg",
  },
  {
    quote:
      "I have invested with this platform and gotten my money in my account. This is legit and safe. Great doing business with them.",
    name: "Melodie Ferguson",
    designation: "User from India",
    avatar:
      "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/testimonial/631d7e336da8c1662877235.jpg",
  },
];

export default function TestimonialSlider() {
  return (
    <div className="w-full max-w-[1280px] mx-auto mt-10 ">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        pagination={{ clickable: true }}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        loop
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((t, i) => (
          <SwiperSlide key={i}>
            <div className=" bg-[hsla(40,54%,56%,0.5)] rounded-lg shadow-lg h-full flex flex-col justify-between text-white mb-12">
              <div className="px-8 py-16 pt-8 flex-1 border-b-[1px] border-[hsla(40,54%,56%,1)]">
                <p>{t.quote}</p>
              </div>
              <div className="px-8 py-6 relative">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-18 h-18 rounded-full object-cover absolute border-2 border-[hsla(40,54%,56%,1)] right-1/12 -top-2/5"
                />
                <div>
                  <h6 className="font-semibold ">{t.name}</h6>
                  <p className="text-sm ">{t.designation}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
