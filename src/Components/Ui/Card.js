import React from "react";

const Card = React.memo(function Card({ _id, image, title, price, rating }) {
  const starRating = () =>
    [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={i < rating ? "text-yellow-400" : "text-gray-300"}
      >
        &#9733;
      </span>
    ));

  return (
    <div className="card flex flex-col p-4 transition rounded-[20px]">
      <div className="bg-[#F0EEED] h-[200px] lg:h-[298px] w-full lg:w-[295px] flex justify-center items-center rounded-[20px] overflow-hidden">
        <img
          src={image}
          loading="lazy"
          alt={title}
          className="w-full h-full object-cover object-top rounded-[20px]"
        />
      </div>
      <div className="text-start w-full">
        <h2 className="text-[20px] font-bold mt-[16px]">{title}</h2>
        <div className="flex gap-[13px]">
          <div>{starRating()}</div>
          <div className="text-[14px] font-normal"> {rating}/5</div>
        </div>
        <p className="text-[24px] font-bold text-black text-start mt-[8px]">
          {price}
        </p>
      </div>
    </div>
  );
});

export default Card;

// <Link to={`/products/${_id}/${slugify(title)}`} className="block">
// </Link>
