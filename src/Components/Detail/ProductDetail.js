import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Spinner from "../Ui/Spinner";
import axios from "axios";
import { Button } from "@headlessui/react";
import Tabs from "../Ui/Tabs";
import Error from "../Ui/Error";
import ProductTab from "./ProductTab";
import RelatedProducts from "./RelatedProducts";

function ProductDetail() {
  const { id } = useParams(); // this comes from the route /products/:id
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // const location = useLocation();
  // const reviews = location.state?.reviews || [];
  // console.log(reviews);

  useEffect(() => {
    //   const fetchProduct = async () => {
    //     try {
    //       const response = await axios.get(
    //         `https://fakestoreapiserver.reactbd.org/api/products/${id}`
    //       );
    //       setProduct(response.data);
    //     } catch (err) {
    //       setError(  err.message);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   fetchProduct();
    // }, [id]);

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapiserver.reactbd.org/api/products/${id}`
        );
        setProduct(response.data);

        // fetch all products for related
        const allRes = await axios.get(
          "https://fakestoreapiserver.reactbd.org/api/products"
        );
        const allProducts = allRes.data.data;

        // console.log(allProducts.map((p) => p.brand));

        // filter out same product + match by category
        const related = allProducts.filter(
          (p) =>
            p.category === response.data.category && p._id !== response.data._id
        );
        console.log(related.length);
        setRelatedProducts(related);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const topRelatedProudcts = relatedProducts
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  useEffect(() => {
    setSelectedSize(product?.size?.[0] || null);
  }, [product]);

  useEffect(() => {
    const fetchReviewsAndUsers = async () => {
      try {
        const [reviewsRes, usersRes] = await Promise.all([
          axios.get("https://fakestoreapiserver.reactbd.org/api/reviews"),
          axios.get("https://fakestoreapiserver.reactbd.org/api/users"),
        ]);

        const usersById = usersRes.data.data.reduce((acc, user) => {
          acc[user._id] = user;
          return acc;
        }, {});

        const reviewsWithUser = reviewsRes.data.data
          .slice(0, 10)
          .map((review) => ({
            ...review,
            user: usersById[review.userId] || null,
          }));

        setReviews(reviewsWithUser);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReviewsAndUsers();
  }, []);

  const starRating = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`${
          i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
        } text-4xl`}
      >
        &#9733;
      </span>
    ));
  };

  const getDiscount = (originalPrice, discountedPrice) => {
    return ((originalPrice - discountedPrice) / originalPrice) * 100;
  };

  if (loading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div>
        <Error message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  if (!product) return <div>Product not found</div>;

  return (
    <div className="px-[16px] lg:px-[100px] pt-[80px] pb-[195px] lg:pb-[168px]">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 ">
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-[440px] h-[530px] object-cover rounded-[20px]"
          />
        </div>
        <div className="lg:w-[60%]">
          <div className="border-b border-black border-opacity-10 pb-[30px]">
            <h2 className="text-[40px] font-poppins font-bold">
              {product.title}
            </h2>

            <div className="mt-2 flex items-center gap-2">
              {starRating(product.rating)}
              <span className="text-gray-500 text-2xl">{product.rating}/5</span>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <p className="text-[32px] font-bold">
                ${product.discountedPrice}
              </p>
              <p className="line-through text-black text-opacity-10 text-[32px] font-bold">
                ${product.price}
              </p>
              <div className="bg-[#FF3333] bg-opacity-10 rounded-[62px] py-[6px] px-[14px]">
                <p className="text-[#FF3333] text-[18px] font-bold">
                  -{getDiscount(product.price, product.discountedPrice)}%
                </p>
              </div>
            </div>
            <p className="mt-[20px] text-[16px] text-black text-opacity-60">
              {product.description}
            </p>
          </div>
          <div className="py-[30px] border-b border-black border-opacity-10">
            <p className="text-[16px] text-black text-opacity-60 pb-[16px]">
              choose size
            </p>
            <div className="flex gap-[12px] ">
              {product.size.map((sizes, index) => (
                <Button
                  key={index}
                  onClick={() => setSelectedSize(sizes)}
                  className={`py-[12px] px-[24px] rounded-[62px] transition 
                    ${
                      selectedSize === sizes
                        ? "bg-black text-white"
                        : "bg-[#F0F0F0] hover:bg-black hover:text-white"
                    }
                  `}
                >
                  {sizes.toUpperCase() === "S"
                    ? "Small"
                    : sizes.toUpperCase() === "M"
                    ? "Medium"
                    : sizes.toUpperCase() === "L"
                    ? "Large"
                    : sizes}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-[20px] mt-6">
            {/* Minus button */}

            <div className="flex items-center gap-[5px] lg:gap-4 border border-black border-opacity-10 rounded-full py-[12px] px-[16px] lg:px-[20px] bg-[#F0F0F0]">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="w-10 h-10 flex items-center justify-center text-[14px] lg:text-xl hover:bg-black hover:text-white transition"
              >
                -
              </button>

              {/* Quantity number */}
              <span className="text-[14px] lg:text-xl font-medium text-center">
                {quantity}
              </span>

              {/* Plus button */}
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="w-10 h-10 flex items-center justify-center text-[14px] lg:text-xl hover:bg-black hover:text-white transition"
              >
                +
              </button>
            </div>
            <div className="flex-1">
              <Button className="w-full py-[15px] bg-black text-white rounded-[62px]">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <ProductTab review={reviews} products={product} />
      </div>
      <div>
        <RelatedProducts relatedProduct={topRelatedProudcts} />
      </div>
    </div>
  );
}

export default ProductDetail;
