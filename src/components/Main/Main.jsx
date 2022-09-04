import { Routes, Route } from "react-router";
import About from "./About";
import Catalog from "./Catalog";
import Contacts from "./Contacts";

function Main() {
  return (
    <div>
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/contacts" element={<Contacts />} />
    </Routes>
    </div>
  );
}

export default Main;
