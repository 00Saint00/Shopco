import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header.jsx";
import Banner from "./Components/Banner/Banner.js";
import LatestArrival from "./Components/Homepage/Latest/latestArrival.js";
import Home from "./Components/Homepage/Home.js";
import Footer from "./Components/Footer/footer.js";
import ProductDetail from "./Components/Detail/ProductDetail.js";
import Category from "./Components/Category Pages/Category.js";
import Topselling from "./Components/Category Pages/TopSellingProducts.js";
import Shop from "./Components/Shop/Shop.js";
import AuthPage from "./Components/auth/AuthPage.js";

function App() {
  return (
    <div className="App">
      {/* <Header />
      <Home />
      <Footer /> */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id/:slug" element={<ProductDetail />} />
          <Route path="/category/:name" element={<Category />} />{" "}
          <Route path="/top-selling" element={<Topselling />} />
          <Route path="/shop/:sortBy?" element={<Shop />} />
          <Route path="/login" element={<AuthPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
