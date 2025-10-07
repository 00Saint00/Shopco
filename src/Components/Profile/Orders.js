import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "../Ui/Spinner";
import axios from "axios";

const Orders = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login", { state: { from: location } });
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          "https://fakestoreapiserver.reactbd.org/api/orders"
        );

        // filter orders for current user
        const userOrders = data.data.filter(
          (order) => order.userId === (parsedUser.id || parsedUser._id)
        );

        setUser((prev) => ({ ...prev, orders: userOrders }));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate, location]);

  if (loading)
    return (
      <div className="d-flex justify-center align-items-center">
        <Spinner />
      </div>
    );
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!user) return null;

  return (
    <div className="orders-page">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>

      {Array.isArray(user.orders) && user.orders.length > 0 ? (
        <div className="grid grid-col-1 lg:grid-cols-2 gap-4">
          {user.orders.map((order) => (
            <div
              key={order._id}
              className="order-card border p-4 rounded shadow-sm space-y-2 w-full"
            >
              <div className="order-details space-y-1">
                <p className="text-[18px] font-bold">
                  Order ID:{" "}
                  <span className="text-[18px] font-normal">{order._id}</span>
                </p>
                <p className="text-[18px] font-bold">
                  Status:{" "}
                  <span className="text-[18px] font-normal">
                    {order.status}
                  </span>
                </p>
                <p className="text-[18px] font-bold">
                  Order Date:{" "}
                  <span className="text-[18px] font-normal">
                    {new Date(order.orderDate).toLocaleString()}
                  </span>
                </p>
                <p className="text-[18px] font-bold">
                  Total:{" "}
                  <span className="text-[18px] font-normal">
                    ${order.totalAmount}
                  </span>
                </p>
              </div>

              <div className="order-items mt-2">
                <strong>Items:</strong>
                <ul className="ml-4 list-disc">
                  {Array.isArray(order.items) &&
                    order.items.map((item) => (
                      <li key={item.productId}>
                        {item.name} x {item.quantity} (${item.price})
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
