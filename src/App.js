import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Components/Header/Header.jsx";
import Banner from "./Components/Banner/Banner.js";
import LatestArrival from "./Components/Homepage/Latest/latestArrival.js";
import Home from "./Components/Homepage/Home.js";
import Footer from "./Components/Footer/footer.js";
import ProductDetail from "./Components/Detail/ProductDetail.js";
import Category from "./Components/Category Pages/Category.js";
import Topselling from "./Components/Category Pages/TopSellingProducts.js";
import Shop from "./Components/Shop/Shop.js";
import Cart from "./Components/Cart/Cart.js";
import Profile from "./Components/Profile/Profile.js";
import AuthPage from "./Components/auth/AuthPage.js";
import AuthRoute from "./Components/utils/AuthRoute.jsx";

function App() {
  useEffect(() => {
    const checkExpiry = () => {
      const expiryTime = localStorage.getItem("expiryTime");
      if (expiryTime && Date.now() > Number(expiryTime)) {
        // expired → clear storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("expiryTime");
        window.location.href = "/login"; // redirect to login
      }
    };

    // run once on load
    checkExpiry();

    // run every 5s to catch expiry while browsing
    const interval = setInterval(checkExpiry, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      {/* <Header />
      <Home />
      <Footer /> */}
      <Router>
        <Header />
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id/:slug" element={<ProductDetail />} />
            <Route path="/category/:name" element={<Category />} />{" "}
            <Route path="/top-selling" element={<Topselling />} />
            <Route path="/shop/:sortBy?" element={<Shop />} />
            <Route
              path="/login"
              element={
                <AuthRoute type="guest">
                  <AuthPage />
                </AuthRoute>
              }
            />
            {/* Logged-in users only */}
            <Route
              path="/profile"
              element={
                <AuthRoute type="protected">
                  <Profile />
                </AuthRoute>
              }
            />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
