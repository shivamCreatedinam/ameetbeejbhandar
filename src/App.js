import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Shop } from "./components/Shop/Shop";
import { Product_details } from "./components/Product_details/Product_details";
import { Checkout } from "./components/Checkout/Checkout";
import { AboutUS } from "./components/AboutUS/AboutUS";
import { Terms_Conditions } from "./components/Terms_Conditions/Terms_Conditions";
import { Test } from "./components/Test/Test";
import { Privacy } from "./components/Privacy/Privacy";
import { Return } from "./components/Return/Return";
import { Shipping } from "./components/Shipping/Shipping";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products/:productId" element={<Product_details />} />
          <Route path="/about" element={<AboutUS />} />
          <Route path="/terms_&_conditions" element={<Terms_Conditions />} />
          <Route path="/privacy_policies" element={<Privacy />} />
          <Route path="/return" element={<Return />} />
          <Route path="/shipping" element={<Shipping />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
