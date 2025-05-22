import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Grid,
  TextField,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const initialCart = [
  {
    id: 1,
    name: "Nike Shoes",
    price: 4999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    quantity: 2,
  },
  {
    id: 2,
    name: "Gucci Bag",
    price: 8999,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600",
    quantity: 1,
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCart);

  const handleQuantityChange = (id, value) => {
    const quantity = Math.max(1, parseInt(value) || 1);
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Container sx={{ mt: 4, minHeight: '81vh', width: '100%', display: 'flex', flexDirection: 'column'}}>
      <Typography variant="h4" gutterBottom fontWeight={700} textAlign='left' width='100%'>
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6">Your cart is empty.</Typography>
      ) : (
        <>
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ display: "flex", mb: 2, width: '800px', ml: 6 }}>
              <CardMedia
                component="img"
                sx={{ width: 150 }}
                image={item.image}
                alt={item.name}
              />
              <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ₹{item.price}
                  </Typography>
                  <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
                    <Grid item>
                      <TextField
                        type="number"
                        label="Qty"
                        size="small"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, e.target.value)
                        }
                        inputProps={{ min: 1 }}
                        sx={{ width: 80 }}
                      />
                    </Grid>
                    <Grid item>
                      <IconButton
                        color="error"
                        onClick={() => handleRemove(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Box>
            </Card>
          ))}

          <Box sx={{ textAlign: "right", mt: 3 }}>
            <Typography variant="h6">Total: ₹{getTotal()}</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Cart;
