import React from "react";
import Card from "../Ui/Card";
import { Link } from "react-router-dom";

const RelatedProducts = ({ relatedProduct }) => {
  //   console.log("relates-resource", relatedProduct.length);

  const sortedRelated = relatedProduct
    .slice() // make a copy so you don't mutate original
    .sort(
      (a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price)
    );

  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  // console.log(relatedProduct.name, relatedProduct.discountedPrice);

  return (
    <div className="py-[64px]">
      <h3 className="text-center text-[48px] font-bold font-poppins uppercase pb-[55px]">
        You might also like
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[60px]">
        {sortedRelated.map((related) => {
          return (
            <Link
              key={related._id}
              to={`/products/${related._id}/${slugify(related.title)}`}
            >
              <Card
                {...related}
                price={related.discount || related.price} // fallback in case discountedPrice missing
              />
            </Link>
          );
        })}
        {/* {relatedProduct.map((related) => (
          <Link to={`/products/${related._id}/${slugify(related.title)}`}>
            <Card
              key={related._id}
              {...related}
              price={related.discountedPrice}
            />
          </Link>
        ))} */}
      </div>
    </div>
  );
};

export default RelatedProducts;
