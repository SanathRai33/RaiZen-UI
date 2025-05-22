import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Navbar from "../Component/Navbar";
import SecNav from "../Component/SecNav";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Order from "../Pages/Order";
import ProductView from "../Pages/Product";
import Footer from "../Component/Footer";
import Cart from "../Pages/Cart";
import Whishlist from "../Pages/Whishlist";
import Offers from "../Pages/Offers";
import NewArrivals from "../Pages/NewArrivals";

export default function UserRoutes() {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <>
            <Navbar />
            <SecNav />
            <Routes>
              <Route path="/*" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/order" element={<Order/>}/>
              <Route path="/product/:id" element={<ProductView />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/whishlist" element={<Whishlist/>} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/new-arrivals" element={<NewArrivals/>}/>
              {/* <Route path="*" element={<Nopage />} /> */}
            </Routes>
            <Footer />
          </>
        }
      />
      {/* <Route path="/logout" element={<Logout />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> 
    </Routes>
  );
}
