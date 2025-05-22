import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Grid,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const initialWishlist = [
  {
    id: 101,
    name: "Nike Air Max",
    price: 5999,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format",
  },
  {
    id: 102,
    name: "Gucci Leather Bag",
    price: 12999,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format",
  },
];

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const handleRemove = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMoveToCart = (item) => {
    // Integrate with your cart logic here
    console.log("Moved to cart:", item.name);
    handleRemove(item.id);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, minHeight: '81vh', minWidth: '79%', display: 'flex', flexDirection: 'column',  }}>
      <Typography variant="h4" gutterBottom fontWeight={700} textAlign='left' width='100%' >
        Wishlist
      </Typography>

      {wishlist.length === 0 ? (
        <Typography>Your wishlist is empty.</Typography>
      ) : (
        wishlist.map((item) => (
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
                <Typography variant="body2">Price: ₹{item.price}</Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item>
                    <Button
                      variant="outlined"
                      startIcon={<AddShoppingCartIcon />}
                      onClick={() => handleMoveToCart(item)}
                    >
                      Move to Cart
                    </Button>
                  </Grid>
                  <Grid item>
                    <IconButton
                      color="error"
                      onClick={() => handleRemove(item.id)}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Box>
          </Card>
        ))
      )}
    </Container>
  );
};

export default Wishlist;
