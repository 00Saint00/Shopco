// SwiperNavigation.js
import React from "react";
import { useSwiper } from "swiper/react";

function SwiperPrevButton() {
  const swiper = useSwiper();

  return (
    <button onClick={() => swiper.slidePrev()} className="swiper-button-prev">
      Prev
    </button>
  );
}

function SwiperNextButton() {
  const swiper = useSwiper();

  return (
    <button onClick={() => swiper.slideNext()} className="swiper-button-next">
      Next
    </button>
  );
}

export { SwiperPrevButton, SwiperNextButton };
