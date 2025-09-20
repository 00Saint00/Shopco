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

// Lazy-load heavy components to reduce initial bundle size and main thread work
const LatestArrival = lazy(() => import("./Latest/latestArrival"));
const Topselling = lazy(() => import("./Top selling/topselling"));
const DressStyles = lazy(() => import("./Dress Styles/dressStyle"));
const Testimonials = lazy(() => import("./Testimonials/testimonial"));
const Slider = lazy(() => import("../Ui/Slider"));

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
    onSlideChange: () => console.log("slide change"),
    onSwiper: (swiper) => console.log(swiper),
    breakpoints: {
      320: {
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 60,
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  };
  // useEffect(() => {
  //   axios
  //     .get("https://fakestoreapiserver.reactbd.org/api/products") // Update with your API endpoint
  //     .then((response) => {
  //       const products = response.data.data; // Assuming response.data is an object with a data property
  //       const brandNames = [...new Set(products.map((item) => item.brand))];
  //       const slidesData = brandNames.map((brand) => ({ title: brand }));
  //       setSlides(slidesData);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapiserver.reactbd.org/api/products"
        );
        const allProducts = response.data.data;

        // Use startTransition for low-priority state update
        startTransition(() => {
          setProducts(allProducts); // Store full products
          setLoading(false);
        });
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  //latestArrival

  // const latestProducts = useMemo(() => {
  //   if (!products || products.length === 0) return [];
  //   return products.slice(-8);
  // });

  const latestProducts = products.slice(-8);

  //topSelling
  const topSellingProducts = useMemo(
    () => [...products].sort((a, b) => b.rating - a.rating).slice(0, 8), // top 8 by rating
    [products]
  );

  //unique slides (set)
  const uniqueBrands = useMemo(() => {
    return [...new Set(products.map((p) => p.brand))].map((brand) => ({
      brand,
    }));
  }, [products]);

  console.log("uniqueBrands", uniqueBrands);
  console.log("uniqueBrands", uniqueBrands.length);

  //review and users
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

  if (loading) return <Spinner />; // No need to lazy-load Spinner for small SVGs

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="">
      <Banner />
      <div className="bg-black py-[32px] lg:py-[44px] text-center">
        <Slider slides={uniqueBrands} settings={settings} />
      </div>
      <section className="px-[16px] lg:px-[100px] border-t border-black border-opacity-10">
        <Suspense fallback={<div>Loading Latest Arrival...</div>}>
          <LatestArrival product={latestProducts} reviews={reviews} />
        </Suspense>
        <hr className="border border-black border-opacity-10" />
        <Suspense fallback={<div>Loading Latest Arrival...</div>}>
          <Topselling topSold={topSellingProducts} reviews={reviews} />
        </Suspense>

        <div className="py-[50px] lg:py-[100px]">
          <Suspense fallback={<div>Loading Latest Styles...</div>}>
            <DressStyles />
          </Suspense>
        </div>
        <div className="py-[50px] pt-[50px] lg:pt-[80px] pb-[90%] lg:pb-[170px]">
          <Suspense fallback={<div>Loading Latest Testimonials...</div>}>
            <Testimonials reviews={reviews} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

export default Home;
