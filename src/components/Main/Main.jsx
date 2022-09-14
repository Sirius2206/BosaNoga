import { useEffect } from "react";
import { Routes, Route } from "react-router";
import MainPage from "./MainPage";
import About from "./About";
import Catalog from "./Catalog";
import Contacts from "./Contacts";
import Banner from "./Banner";
import Cart from "./Cart";
import NotFound from "./NotFound";
import Card from "../Cards/Card";
import { restoreLocalStorage } from "../../store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

function Shop() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  let count = 1;
  useEffect(() => {
    if (count) {
      if (cart.length === 0 && localStorage.getItem("BosaNogaCart")) {
        for (let item of JSON.parse(localStorage.getItem("BosaNogaCart"))) {
          dispatch(restoreLocalStorage(item));
        }
      }
      count--;
    }
  }, []);

  return (
    <div>
      <Banner>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/products/:id" element={<Card />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Banner>
    </div>
  );
}

export default Shop;
