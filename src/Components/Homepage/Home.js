import React, {
  useState,
  useEffect,
  useMemo,
  startTransition,
  Suspense,
  lazy,
} from "react";
import Banner from "../Banner/Banner";
import { Autoplay } from "swiper/modules";
import axios from "axios";
import Spinner from "../Ui/Spinner";
import { applyDailyDiscounts } from "../utils/discountUtils";

// Lazy-load heavy components
const LatestArrival = lazy(() => import("./Latest/latestArrival"));
const Topselling = lazy(() => import("./Top selling/topselling"));
const DressStyles = lazy(() => import("./Dress Styles/dressStyle"));
const Testimonials = lazy(() => import("./Testimonials/testimonial"));
const Slider = lazy(() => import("../Ui/Slider"));

// // --- Daily Discount Logic ---
// function getDailyDiscountedItems(products, count = 10) {
//   const today = new Date().toISOString().split("T")[0]; // "2025-09-20"
//   const seed = today.split("-").join(""); // e.g. "20250920"
//   let rng = mulberry32(parseInt(seed)); // seeded RNG

//   const shuffled = [...products].sort(() => rng() - 0.5);
//   return shuffled.slice(0, count);
// }

// // Small seeded RNG
// function mulberry32(a) {
//   return function () {
//     a |= 0;
//     a = (a + 0x6d2b79f5) | 0;
//     let t = Math.imul(a ^ (a >>> 15), 1 | a);
//     t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
//     return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
//   };
// }

function Home() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //swiper settings
  const settings = {
    modules: [Autoplay],
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    speed: 900,
    loop: true,
    slidesPerView: 3,
    breakpoints: {
      320: { slidesPerView: 1, centeredSlides: true, spaceBetween: 10 },
      640: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 2, spaceBetween: 60 },
      1280: { slidesPerView: 3, spaceBetween: 40 },
    },
  };

  // --- Fetch Products ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapiserver.reactbd.org/api/products"
        );
        const allProducts = response.data.data;

        // Pick discounted items for today
        const discountedItems = applyDailyDiscounts(allProducts, 10);

        // Add `isDiscounted` flag to the products
        const taggedProducts = allProducts.map((p) => ({
          ...p,
          isDiscounted: discountedItems.some((d) => d._id === p._id),
        }));

        startTransition(() => {
          setProducts(taggedProducts);
          setLoading(false);
        });
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- Derived data ---
  const latestProducts = products.slice(-8);

  const topSellingProducts = useMemo(
    () => [...products].sort((a, b) => b.rating - a.rating).slice(0, 8),
    [products]
  );

  const uniqueBrands = useMemo(() => {
    return [...new Set(products.map((p) => p.brand))].map((brand) => ({
      brand,
    }));
  }, [products]);

  // --- Fetch Reviews + Users ---
  useEffect(() => {
    const fetchReviews = axios.get(
      "https://fakestoreapiserver.reactbd.org/api/reviews"
    );
    const fetchUsers = axios.get(
      "https://fakestoreapiserver.reactbd.org/api/users"
    );

    Promise.all([fetchReviews, fetchUsers])
      .then(([reviewsResponse, usersResponse]) => {
        const reviewData = reviewsResponse.data.data.map((review) => ({
          comment: review.comment,
          rating: review.rating,
          userId: review.userId,
        }));
        const usersData = {};
        usersResponse.data.data.forEach((user) => {
          usersData[user._id] = user;
        });
        const reviewsWithUser = reviewData.map((review) => ({
          ...review,
          user: usersData[review.userId],
        }));
        setReviews(reviewsWithUser);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Banner />
      <div className="bg-black py-[32px] lg:py-[44px] text-center">
        <Slider slides={uniqueBrands} settings={settings} />
      </div>
      <section className="px-[16px] lg:px-[100px] border-t border-black border-opacity-10">
        <Suspense fallback={<div>Loading Latest Arrival...</div>}>
          <LatestArrival product={latestProducts} reviews={reviews} />
        </Suspense>
        <hr className="border border-black border-opacity-10" />
        <Suspense fallback={<div>Loading Top Selling...</div>}>
          <Topselling topSold={topSellingProducts} reviews={reviews} />
        </Suspense>

        <div className="py-[50px] lg:py-[100px]">
          <Suspense fallback={<div>Loading Dress Styles...</div>}>
            <DressStyles />
          </Suspense>
        </div>
        <div className="py-[50px] pt-[50px] lg:pt-[80px] pb-[90%] lg:pb-[170px]">
          <Suspense fallback={<div>Loading Testimonials...</div>}>
            <Testimonials reviews={reviews} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

export default Home;
