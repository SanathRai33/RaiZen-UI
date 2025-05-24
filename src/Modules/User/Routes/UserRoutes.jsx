import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Component/Navbar";
import SecNav from "../Component/SecNav";
import Footer from "../Component/Footer";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ProductView from "../Pages/Product";
import Order from "../Pages/Order";
import Cart from "../Pages/Cart";
import Whishlist from "../Pages/Whishlist";
import Offers from "../Pages/Offers";
import NewArrivals from "../Pages/NewArrivals";
import useDebounce from "../Component/useDebounce";
import SearchResults from "../Pages/SearchResult";


export default function UserRoutes() {

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SecNav />
      <Routes>
        <Route path="/" element={<Home searchTerm={debouncedSearch} />} />
        <Route path="/home" element={<Home searchTerm={searchTerm} />} />
        <Route path="/product/:id" element={<ProductView />} />
        <Route path="/order" element={<Order />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/whishlist" element={<Whishlist />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search/:query" element={<SearchResults />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Footer />
    </>
  );
}
