import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Virtual } from "swiper/modules";
import Card from "../../Ui/Card";
import "swiper/css";
import "swiper/css/autoplay";
import { Button } from "@headlessui/react";
import { Link } from "react-router-dom";

function LatestArrival({ product, reviews }) {
  // const latestProducts = useMemo(() => {
  //   if (!product || product.length === 0) return [];
  //   return product.slice(-8);
  // }, [product]);

  // Simple slugify function
  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  return (
    <div className="latest-arrivals py-20 text-center">
      <h1 className="text-[60px] font-bold font-poppins">New Arrivals</h1>

      <Swiper
        modules={[Autoplay, Virtual]}
        spaceBetween={16}
        slidesPerView={1} // Adjust for responsive breakpoints below
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        speed={800}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
          1280: { slidesPerView: 4, spaceBetween: 40 },
        }}
      >
        {product.map((prod, index) => (
          <SwiperSlide virtualIndex={index} key={prod._id}>
            <Link
              to={`/products/${prod._id}/${slugify(prod.title)}`}
              state={{ reviews }}
            >
              <Card {...prod} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-8">
        <Link to="/shop/latest-product">
          <Button className="bg-white border border-black border-opacity-10 text-black px-20 py-4 rounded-full font-normal hover:bg-black hover:bg-opacity-10 transition duration-300">
            View All
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default LatestArrival;
