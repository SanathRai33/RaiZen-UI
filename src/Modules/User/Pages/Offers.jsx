import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Box,
  Button,
} from "@mui/material";

// Sample product list with offer expiration timestamps
const products = [
  {
    id: 1,
    name: "Nike Shoes",
    description: "Comfortable running shoes",
    price: 4999,
    discount: 25,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format",
    offerExpiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
  },
  {
    id: 2,
    name: "Denim Jeans",
    description: "Stylish and comfortable",
    price: 2999,
    discount: 30,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format",
    offerExpiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
  },
  {
    id: 3,
    name: "Gaming Mouse",
    description: "RGB wireless gaming mouse",
    price: 1499,
    discount: 40,
    offerExpiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
  },
];

// Timer Component
const Timer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState(getRemainingTime(endTime));

  function getRemainingTime(end) {
    const total = Date.parse(end) - Date.now();
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const seconds = Math.floor((total / 1000) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    return total > 0 ? { total, hours, minutes, seconds } : null;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = getRemainingTime(endTime);
      setTimeLeft(newTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (!timeLeft) return <Chip label="Offer Expired" color="error" />;

  return (
    <Chip
      label={`${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s left`}
      color="success"
      variant="outlined"
    />
  );
};

const Offer = () => {
  // Filter products with discount >= 20
  const [activeOffers, setActiveOffers] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const filtered = products.filter(
        (product) => new Date(product.offerExpiresAt) > new Date()
      );
      setActiveOffers(filtered);
    }, 1000); // Update every second to remove expired offers

    return () => clearInterval(interval);
  }, []);

  return (
    <Container sx={{ mt: 4, minHeight: '81vh' }}>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        Hot Offers
      </Typography>
      <Grid container spacing={3}>
        {activeOffers.length > 0 ? (
          activeOffers.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id} minWidth={300}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" gutterBottom>
                    {product.description}
                  </Typography>
                  <Typography color="primary">₹{product.price}</Typography>
                  <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Chip label={`${product.discount}% OFF`} color="primary" />
                    <Timer endTime={product.offerExpiresAt} />
                  </Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ m: 2 }}>
            No active offers available.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Offer;
