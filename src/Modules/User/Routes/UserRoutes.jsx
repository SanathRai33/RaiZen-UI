import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Navbar from "../Component/Navbar";
import SecNav from "../Component/SecNav";
import Register from "../Pages/Register";
import Login from "../Pages/Login";

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
              {/* <Route path="*" element={<Nopage />} /> */}
            </Routes>
            {/* <Footer /> */}
          </>
        }
      />
      {/* <Route path="/logout" element={<Logout />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> 
    </Routes>
  );
}
