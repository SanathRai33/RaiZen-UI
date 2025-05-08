import React from 'react'
import {  Routes, Route } from "react-router-dom";
import Home from '../Pages/Home';
// import Login from '../Pages/Login';
// import Logout from '../Pages/Logout';
// import Register from '../Pages/Register';
// import AddProduct from '../Component/AddProduct';
// import DashBorad from '../Component/DashBorad';
// import PackageView from '../Component/PackageView';
// import HotelView from '../Component/HotelView';
// import RestaurantView from '../Component/RestaurantView';
// import BookStatus from '../Component/BookStatus';
// import PackageUpdate from '../Component/PackageUpdate';
// import RestaurantUpdate from '../Component/RestaurantUpdate';
// import HotelUpdate from '../Component/HotelUpdate';
export default function AdminRoutes() {
  return (
    <div>
       <Routes>
        <Route path="/home" element={<Home/>} />
        {/*<Route path="/logout" element={<Logout/>}/> */}
        <Route path="/" element={<home />} />
        {/* <Route path="/register" element={<Register />} />
        <Route path='/add-package' element={<AddProduct/>} />
        <Route path='/dash-board' element={<DashBorad/>} />
        <Route path="/PackageUpdate/:id" element={<PackageUpdate />} />
        <Route path="/HotelUpdate/:id" element={<HotelUpdate />} />
        <Route path="/RestaurantUpdate/:id" element={<RestaurantUpdate />} />
        <Route path="/PackageView/:id" element={<PackageView />} />
        <Route path="/HotelView/:id" element={<HotelView />} />
        <Route path="/RestaurantView/:id" element={<RestaurantView />} />
        <Route path='/BookingStatus' element={<BookStatus/>}/> */}
       </Routes>
    </div>
  )
}
