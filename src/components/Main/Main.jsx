import { Routes, Route } from "react-router";
import MainPage from "./MainPage";
import About from "./About";
import Catalog from "./Catalog";
import Contacts from "./Contacts";
import Banner from "./Banner";
import Cart from "./Cart";
import NotFound from "./NotFound";
import Card from "../Cards/Card";
import Preloader from "../Preloader/Preloader";

function Shop() {
  return (
    <div>
      <Banner >
        <Routes> 
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/products/:id" element={<Card />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/cart" element = {<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Banner>
      
    </div>
  );
}

export default Shop;