import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRoutes from "./Modules/Admin/Routes/AdminRoutes";
import UserRoutes from "./Modules/User/Routes/UserRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/admin/*' element={<AdminRoutes/>} />
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
