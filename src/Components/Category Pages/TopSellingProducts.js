import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Spinner from "../Ui/Spinner";
import Error from "../Ui/Error";
import Card from "../Ui/Card";
import { applyDailyDiscounts } from "../utils/discountUtils";

const TopSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        // Fetch all products (if API can't filter/sort)
        const res = await axios.get(
          "https://fakestoreapiserver.reactbd.org/api/products"
        );
        const allProducts = res.data.data;

        setProducts(allProducts); // set raw data for useMemo
      } catch (err) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  // Compute top 15 discounted & highest-rated products
  const topProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    // Apply discounts only to products we have
    const discounted = applyDailyDiscounts(products, 10);

    // Sort by rating descending and pick top 15
    return discounted.sort((a, b) => b.rating - a.rating).slice(0, 15);
  }, [products]);

  if (loading) return <Spinner />;
  if (error)
    return <Error message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="px-[16px] lg:px-[100px] pt-[80px] pb-[195px] lg:pb-[168px]">
      <h2 className="text-3xl font-bold mb-6">Top Selling Products</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {topProducts.map((product) => (
          <Card key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default TopSellingProducts;
