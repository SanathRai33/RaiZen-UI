import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
} from "@mui/material";

// Dummy data — replace with API call or props
const allProducts = [
    {
        name: "Nike Air Max",
        description: "Latest running shoes",
        price: 7999,
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
        ],
        createdAt: "2025-05-15T10:00:00Z",
    },
    {
        name: "Adidas Hoodie",
        description: "Warm and cozy",
        price: 2999,
        images: [
            "https://images.unsplash.com/photo-1585386959984-a4155223f9ff?w=600"
        ],
        createdAt: "2025-05-10T14:30:00Z",
    },
    {
        name: "New Smartwatch",
        description: "Tracks fitness and health",
        price: 10999,
        images: [
            "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D"
        ],
        createdAt: "2025-05-14T12:00:00Z",
    }
];

const NewArrivals = () => {
    const [newProducts, setNewProducts] = useState([]);

    useEffect(() => {
        const now = new Date();
        const threeDaysAgo = new Date(now);
        threeDaysAgo.setDate(now.getDate() - 3);

        const filtered = allProducts.filter(product =>
            new Date(product.createdAt) >= threeDaysAgo
        );

        setNewProducts(filtered);
    }, []);

    return (
        <Container sx={{ mt: 4, minHeight: '81vh' }}>
            <Helmet>
                <title>New Arrivals</title>
                <meta name="description" content='orders' />
            </Helmet>
            <Typography variant="h4" gutterBottom fontWeight={700}>
                New Arrivals
            </Typography>
            <Grid container spacing={4}>
                {newProducts.length === 0 ? (
                    <Typography variant="h6">No new arrivals in the last 3 days.</Typography>
                ) : (
                    newProducts.map((product, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={product.images[0]}
                                    alt={product.name}
                                />
                                <CardContent>
                                    <Typography variant="h6">{product.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.description}
                                    </Typography>
                                    <Typography variant="h6" sx={{ mt: 1 }}>
                                        ₹{product.price}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" color="primary" fullWidth>
                                        View Product
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </Container>
    );
};

export default NewArrivals;
