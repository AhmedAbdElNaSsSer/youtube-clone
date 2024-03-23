import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./carousel.css";

// import required modules
import { Pagination } from "swiper/modules";
import CardItem from "../card/card";

export default function Carousel({isAvatar,isShort,record}) {
  const cards = () => {
    return record?.map((item, i) => {
      return (
        <SwiperSlide key={i}>
          <CardItem record={item} isAvatar={isAvatar} isShort={isShort}/>
        </SwiperSlide>
      );
    });
  };
  
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        loop={true}
        modules={[Pagination]}
        className="mySwiper"
      >
        {cards()}
      </Swiper>
    </>
  );
}
