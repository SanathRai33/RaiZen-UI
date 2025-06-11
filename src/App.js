import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./Modules/Admin/Routes/AdminRoutes";
import UserRoutes from "./Modules/User/Routes/UserRoutes";
import { AuthProvider } from './Context/AuthContext';
import { CartProvider } from './Context/CartContext'; // 👈 import your Cart context

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/*" element={<UserRoutes />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
