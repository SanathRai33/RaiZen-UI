import { useEffect, useState } from "react";
import '../CSS/Home.css';
import { Helmet } from "react-helmet";
import { Container, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, } from "@mui/material";
import axios from "axios";

const NewArrivals = () => {
    const [newProducts, setNewProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Fetching new arrivals...");
        const fetchNewArrivals = async () => {
            console.log("Fetching new arrivals from API...");
            try {
                const response = await axios.get(`http://localhost:7000/products/filter/new-arrivals`);
                setNewProducts(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError("Failed to fetch New Arrivals.");
            }
        }
        fetchNewArrivals();
    }, []);

    return (
        <Container sx={{ mt: 4, maxHeight: '600px', backgroundColor: '#f5f5f5', minWidth: "100%" }} className="New">
            <Helmet>
                <title>New Arrivals</title>
                <meta name="description" content='orders' />
            </Helmet>
            <Typography variant="h4" gutterBottom fontWeight={800} px={4}>
                New Arrivals 🎉🎊
            </Typography>
            <Grid container spacing={4}>
                {newProducts.length === 0 ? (
                    <Typography variant="h6">No new arrivals in the last 3 days.</Typography>
                ) : (
                    <Grid item xs={12} sm={6} md={4} px={6}
                        sx={{ display: 'flex', alignItems: 'center', flexWrap: "nowrap", gap: 5, minWidth: "100%", overflowX: "scroll", scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none', }, }}
                    >
                        {newProducts.map((product, index) => (
                            <Card key={index} sx={{ minWidth: 350, borderRadius: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                <CardMedia component="img" height="200" image={product.images[0]} alt={product.name} sx={{ objectFit: "contain" }} />
                                <CardContent>
                                    <Typography variant="h6">{product.name}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ borderRadius: '8px' }}>
                                        {product.description}
                                    </Typography>
                                    <Typography variant="h6">
                                        ₹{product.price}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" color="primary" fullWidth>
                                        View Product
                                    </Button>
                                </CardActions>
                            </Card>))}
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default NewArrivals;
