import axios from "axios";
import { useAuth } from "./AuthContext";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  const getUserId = () => {
    const userData = localStorage.getItem("RaiZenUserData");
    const parsedUser = JSON.parse(userData);
    return parsedUser?._id || parsedUser?.id;
  };

  // Fetch cart on login
  useEffect(() => {
    const fetchCart = async () => {
      const userId = getUserId();
      if (userId) {
        try {
          const res = await axios.get(`/api/users/${userId}/cart`);
          setCartItems(res.data.cart);
        } catch (err) {
          console.error("Failed to fetch cart from server", err);
        }
      }
    };
    fetchCart();

    // Sync cart when localStorage changes in another tab
    const handleStorageChange = () => {
      fetchCart();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [user]);

  // Helper: sync local state to DB
  const syncWithBackend = async (newCart) => {
    const userId = getUserId();
    if (!userId) return;
    try {
      await axios.put(`http://localhost:7000/api/users/${userId}/cart`, {
        cartItems: newCart.map((item) => ({
          productId: item.productId || item._id,
          quantity: item.quantity,
        })),
      });
      setCartItems(newCart);
    } catch (err) {
      console.error("Failed to sync cart with server:", err);
    }
  };

  const addToCart = (product) => {
    const existing = cartItems.find(
      (item) => item.productId === product._id || item._id === product._id
    );
    let updatedCart;
    if (existing) {
      updatedCart = cartItems.map((item) =>
        item.productId === product._id || item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...cartItems,
        {
          ...product,
          productId: product._id,
          quantity: 1,
        },
      ];
    }
    syncWithBackend(updatedCart);
  };

  const updateQuantity = (productId, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item.productId === productId || item._id === productId
        ? { ...item, quantity }
        : item
    );
    syncWithBackend(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(
      (item) => item.productId !== productId && item._id !== productId
    );
    syncWithBackend(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
