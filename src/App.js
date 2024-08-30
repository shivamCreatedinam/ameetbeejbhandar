import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Shop } from "./components/Shop/Shop";
import { Product_details } from "./components/Product_details/Product_details";
import { Products } from "./Pages/Products";
import { Checkout } from "./components/Checkout/Checkout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products/:productId" element={<Product_details />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
