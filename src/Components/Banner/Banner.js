import React from "react";
import banner from "../../assets/logo/banner.svg";

import { Button } from "@headlessui/react";

function Banner() {
  return (
    <div className="w-full bg-cover bg-center bg-no-repeat bg-banner">
      <div className="py-[60px] lg:py-[113px] px-[16px] lg:px-[100px]">
        <h1 className="text-[28px] lg:text-[64px] font-poppins font-bold leading-tight lg:leading-[64px] max-w-full lg:max-w-[577px] text-center lg:text-left mx-auto lg:mx-0">
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </h1>
        <p className="text-[16px] max-w-full lg:max-w-[577px] text-[#7c7b7b] py-[24px] lg:py-[32px] text-center lg:text-left mx-auto lg:mx-0">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>

        <div className="flex justify-center lg:justify-start">
          <Button className="bg-black text-white px-[40px] lg:px-[67.5px] py-[15px] rounded-full font-semibold hover:bg-gray-600 transition duration-300">
            Shop Now
          </Button>
        </div>

        <div className="flex flex-wrap justify-center lg:justify-start lg:flex-row gap-[24px] lg:gap-[30px] pt-[40px] lg:pt-[50px] items-center lg:items-start">
          <div className="text-center lg:text-left">
            <p className="text-[32px] lg:text-[40px] font-bold">200+</p>
            <p className="text-[16px] text-black text-opacity-60">
              International Brands
            </p>
          </div>
          <div className="border-t lg:border-t-0 lg:border-x border-black border-opacity-10 px-0 lg:px-[32px] text-center">
            <p className="text-[32px] lg:text-[40px] font-bold">2,000+</p>
            <p className="text-[16px] text-black text-opacity-60">
              High Quality Product
            </p>
          </div>
          <div className="text-center lg:text-left">
            <p className="text-[32px] lg:text-[40px] font-bold">30,000+</p>
            <p className="text-[16px] text-black text-opacity-60">
              Happy Customers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
