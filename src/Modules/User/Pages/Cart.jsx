import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Divider,
  Button,
  Skeleton,
  IconButton,
  Paper,
} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserId = () => {
    const userData = localStorage.getItem("RaiZenUserData");
    const parsedUser = JSON.parse(userData);
    return parsedUser?._id || parsedUser?.id;
  };

  useEffect(() => {
    const fetchCart = async () => {
      const userId = getUserId();
      if (!userId) return;
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:7000/api/users/${userId}/cart`);
        setCartItems(res.data.cart);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
      setLoading(false);
    };

    fetchCart();
  }, []);

const updateQuantity = async (productId, newQuantity) => {
  newQuantity = Math.max(1, newQuantity);

  const updatedCart = cartItems.map((item) =>
    item.productId._id === productId
      ? { ...item, quantity: newQuantity }
      : item
  );
  setCartItems(updatedCart);

  const userId = getUserId();
  await axios.put(`http://localhost:7000/api/users/${userId}/cart`, {
    cartItems: updatedCart.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
    })),
  });
};


  const removeItem = async (productId) => {
  const updatedCart = cartItems.filter(item => item.productId._id !== productId);
  setCartItems(updatedCart);
  const userId = getUserId();
  await axios.put(`http://localhost:7000/api/users/${userId}/cart`, {
    cartItems: updatedCart.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
    })),
  });
};


  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0);

  return (
    <Box p={4} minHeight="100vh" bgcolor='#f1f3f6'>
      <Grid container spacing={3}>
        {/* Cart Items Section */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom fontWeight={700}>
            Shopping Cart
          </Typography>

          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} elevation={3} sx={{ display: "flex", mb: 2, width: '600px', height:220 }}>
                <Skeleton variant="rectangular" width={140} height={140} />
                <Box sx={{ flex: 1, p: 2 }}>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="text" width="30%" />
                </Box>
              </Card>
            ))
          ) : cartItems.length === 0 ? (
            <Typography variant="h6" color="text.secondary">
              Your cart is empty.
            </Typography>
          ) : (
            cartItems.map((item) => (
              <Card key={item.productId._id} elevation={3} sx={{ display: "flex", mb: 2, width: '600px' }}>
                <CardMedia
                  component="img"
                  image={item.productId.images?.[0] || "/placeholder.jpg"}
                  alt={item.productId.name}
                  sx={{ width: 140, height: 140, objectFit: "cover" }}
                />
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600}>
                      {item.productId.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹{item.productId.price} × {item.quantity}
                    </Typography>
                    <Typography variant="subtitle2" fontWeight={500} mt={1}>
                      Subtotal: ₹{item.productId.price * item.quantity}
                    </Typography>

                    {/* Quantity Control */}
                    <Box mt={2} display="flex" alignItems="center" gap={1}>
                      <IconButton onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}>
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}>
                        <AddIcon />
                      </IconButton>
                    </Box>

                    {/* Actions */}
                    <Box mt={1} display="flex" gap={2}>
                      {/* <Button variant="text" color="primary">
                        Save for later
                      </Button> */}
                      <Button variant="text" color="error" onClick={() => removeItem(item.productId._id)}>
                        Remove
                      </Button>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            ))
          )}
        </Grid>

        {/* Summary Section */}
        { cartItems.length !== 0 ? (
          <Grid item xs={12} md={4} position={"sticky"} top={130} height="100vh" width={400} overflow="auto">
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              PRICE DETAILS
            </Typography>
            <Divider />
            <Box display="flex" justifyContent="space-between" my={1}>
              <Typography>Price ({cartItems.length} items)</Typography>
              <Typography>₹{calculateTotal()}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" my={1}>
              <Typography>Discount</Typography>
              <Typography color="green">– ₹0</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" my={1}>
              <Typography>Delivery Charges</Typography>
              <Typography color="green">Free</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6" fontWeight={600}>
                Total Amount
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                ₹{calculateTotal()}
              </Typography>
            </Box>
            <Button variant="contained" color="warning" fullWidth size="large">
              PLACE ORDER
            </Button>
          </Paper>
        </Grid>
        ):(<></>)
        }

      </Grid>
    </Box>
  );
};

export default Cart;
