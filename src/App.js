import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header.jsx";
import Banner from "./Components/Banner/Banner.js";
import LatestArrival from "./Components/Homepage/Latest/latestArrival.js";
import Home from "./Components/Homepage/Home.js";
import Footer from "./Components/Footer/footer.js";
import ProductDetail from "./Components/Detail/ProductDetail.js";

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
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
