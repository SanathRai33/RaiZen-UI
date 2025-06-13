import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("RaiZenUserData");
    const storedToken = localStorage.getItem("RaiZenUserToken");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = (userData, userToken) => {
    localStorage.setItem("RaiZenUserData", JSON.stringify(userData));
    localStorage.setItem("RaiZenUserToken", userToken);
    setUser(userData);
    setToken(userToken);
  };

  const logout = () => {
    localStorage.removeItem("RaiZenUserData");
    localStorage.removeItem("RaiZenUserToken");
    setUser(null);
    setToken(null);
  };

  const refreshUser = async () => {
    const res = await axios.get("/api/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(res.data);
    localStorage.setItem("RaiZenUserData", JSON.stringify(res.data)); // <-- This line is missing
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
