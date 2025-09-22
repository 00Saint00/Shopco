import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../Ui/Spinner";
import Card from "../Ui/Card";
import axios from "axios";
import { Link } from "react-router-dom";
import { applyDailyDiscounts } from "../utils/discountUtils";

const Category = () => {
  const { name } = useParams(); // "men"
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://fakestoreapiserver.reactbd.org/api/products"
        );

        const discountedAll = applyDailyDiscounts(response.data.data, 10);

        // 2. Now filter by category
        const filteredProduct = discountedAll.filter(
          (p) => p.category.toLowerCase() === name.toLowerCase()
        );

        console.log("Filtered:", filteredProduct);
        setProducts(filteredProduct);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [name]);

  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  return (
    <div className="px-[16px] lg:px-[100px] pt-[80px] pb-[195px] lg:pb-[168px]">
      {" "}
      {loading ? (
        <Spinner />
      ) : products.length === 0 ? (
        <p>No products found in {name}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[60px]">
          {products.map((p) => {
            return (
              <Link key={p._id} to={`/products/${p._id}/${slugify(p.title)}`}>
                <div key={p._id}>
                  <Card {...p} />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Category;
