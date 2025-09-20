import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Virtual } from "swiper/modules";
import Card from "../../Ui/Card";
import { Button } from "@headlessui/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/virtual";
import { Link } from "react-router-dom";

function Topselling({ topSold, reviews }) {
  // Compute top 4 products by rating
  // const topSelling = useMemo(() => {
  //   if (!topSold || topSold.length === 0) return [];
  //   return [...topSold].sort((a, b) => b.rating - a.rating).slice(0, 8);
  // }, [topSold]);

  // const topSelling =
  //   topSold && topSold.length > 0
  //     ? [...topSold].sort((a, b) => b.rating - a.rating).slice(0, 8)
  //     : [];

  // Simple slugify function
  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  return (
    <div className="latest-arrivals py-20 text-center">
      {/* Section title */}
      <h1 className="text-[60px] font-bold font-poppins uppercase">
        Top Selling
      </h1>

      {/* Swiper carousel for top selling products */}
      <Swiper
        modules={[Autoplay, Virtual]}
        spaceBetween={16}
        slidesPerView={1} // default for mobile
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          reverseDirection: true,
        }}
        speed={800}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
          1280: { slidesPerView: 4, spaceBetween: 40 },
        }}
      >
        {topSold.map((product, index) => (
          <SwiperSlide virtualIndex={index} key={product._id || index}>
            <Link
              to={`/products/${product._id}/${slugify(product.title)}`}
              state={{ reviews }}
            >
              <Card {...product} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* View All button */}
      <div className="mt-9">
        <Button className="bg-white border border-black border-opacity-10 px-20 py-4 rounded-full font-normal hover:bg-black hover:bg-opacity-10 transition duration-300">
          View all
        </Button>
      </div>
    </div>
  );
}

export default React.memo(Topselling);
