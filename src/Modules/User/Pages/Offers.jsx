import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from '@mui/material';
import '../CSS/Home.css';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Chip, Box, Button, } from "@mui/material";
import axios from "axios";


const Offer = () => {

  const [activeOffers, setActiveOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/products/filter/offer`);
        setActiveOffers(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("Failed to fetch New Arrivals.");
      }
    }
    fetchNewArrivals();
  }, []);

  return (
    <Container sx={{ mt: 4, minWidth: "100%", maxHeight: '700px', }} className="Offer">
      <Typography variant="h4" gutterBottom fontWeight={800} px={4} >
        Hot Offers
      </Typography>
      <Grid container spacing={3} >
        {loading ?
          (<Box sx={{ minWidth: "100%", minHeight:"100px", display: 'flex', alignItems: 'center', justifyContent: "center"}}>
            <CircularProgress />
          </Box>) :

          error ?
            (<Box sx={{ minWidth: "100%", minHeight:"100px", display: 'flex', alignItems: 'center', justifyContent: "center"}}>
              <Typography variant="body1" sx={{ m: 2 }}>
                Failed to get Offers.
              </Typography>
            </Box>) :

            (activeOffers.length > 0 ? (
              <Grid item xs={12} sm={6} md={4} px={6} sx={{ minWidth: "100%", minHeight: "440px", display: 'flex', alignItems: 'center', flexWrap: "nowrap", gap: 3, overflowX: "auto", scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }} >
                {activeOffers.map((product) => (
                  <Card key={product.id} sx={{ borderRadius: '16px', minWidth: '300px', maxWidth: '350px' }}>
                    <CardMedia component="img" height="200" image={product.images[0]} alt={product.name} sx={{ objectFit: "contain" }} />
                    <CardContent>
                      <Typography variant="h6" height={32} overflow={'hidden'} >{product.name}</Typography>
                      <Typography variant="body2" gutterBottom>
                        {product.description}
                      </Typography>
                      <Typography color="primary">₹{product.price}</Typography>
                      <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Chip label={`${product.discount}% OFF`} color="primary" />
                        {/* <Timer endTime={product.offerExpiresAt} /> */}
                      </Box>
                      <Button variant="contained" color="secondary" fullWidth sx={{ mt: 2 }} onClick={() => navigate(`/product/${product._id}`)} > Add to Cart </Button>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            ) : (
              <Box sx={{ minWidth: "100%", minHeight:"100px", display: 'flex', alignItems: 'center', justifyContent: "center"}}>
              <Typography variant="body1" sx={{ m: 2 }}>
                No active offers available.
              </Typography>
              </Box>
            ))}
      </Grid>
    </Container>
  );
};

export default Offer;
