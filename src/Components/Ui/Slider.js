import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// import "swiper/swiper.min.css";
import "swiper/css";
import "swiper/css/autoplay";

function Slider({ slides, settings }) {
  return (
    <div>
      <Swiper {...settings}>
        {slides.map((slide) => (
          <SwiperSlide key={slide.id || slide.brand || slide.title}>
            {slide.image && <img src={slide.image} />}
            {slide.title && <p className="text-white">{slide.title}</p>}
            {slide.brand && (
              <p className="text-white text-[30px] lg:text-[50px]  font-bold font-poppins">
                {slide.brand}
              </p>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slider;
