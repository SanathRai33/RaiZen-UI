import { useEffect, useState } from "react";
import { CircularProgress,  } from '@mui/material';
import '../CSS/Home.css';
import { Container, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Box } from "@mui/material";
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
        <Container sx={{ mt: 4, maxHeight: '600px', minWidth: "100%" }} className="New">
            <Typography variant="h4" gutterBottom fontWeight={800} px={4} pb={2} >
                New Arrivals 🎉🎊
            </Typography>
            <Grid container spacing={4}>

                {loading ?
                    (<Box sx={{ minWidth: "100%", minHeight:"100px", display: 'flex', alignItems: 'center', justifyContent: "center"}}> <CircularProgress /> </Box>) :

                    error ?
                        (<Box sx={{ minWidth: "100%", minHeight:"100px", display: 'flex', alignItems: 'center', justifyContent: "center", backgroundColor: 'yellow'}}> <Typography variant="body1" sx={{ m: 2 }}> Failed to get New Arrivals. </Typography> </Box>) :

                        newProducts.length === 0 ? (
                            <Box sx={{ minWidth: "100%", minHeight:"100px", display: 'flex', alignItems: 'center', justifyContent: "center"}}><Typography variant="h6">No new arrivals in the last 7 days.</Typography></Box>
                        ) : (
                            <Grid item xs={12} sm={6} md={4} px={6} sx={{ display: 'flex', alignItems: 'center', flexWrap: "nowrap", gap: 5, minWidth: "100%", overflowX: "scroll", scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none', }, }}>
                                {newProducts.map((product) => (
                                    <Card key={product.id} sx={{ minWidth: 350, maxWidth: 350, borderRadius: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
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
