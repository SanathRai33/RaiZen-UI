import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // BrowserRouter,
} from "react-router-dom";
import AdminRoutes from "./Modules/Admin/Routes/AdminRoutes";
import UserRoutes from "./Modules/User/Routes/UserRoutes";
// import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <Router>
      <Routes>
        {/* <BrowserRouter>
          <AuthProvider> */}
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/*" element={<UserRoutes />} />
          {/* </AuthProvider>
        </BrowserRouter> */}
      </Routes>
    </Router>
  );
}

export default App;
