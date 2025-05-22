import { Helmet } from "react-helmet";
import {
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    Divider,
    Chip,
    Box,
    CardMedia,
} from "@mui/material";

// Dummy order data (replace with data from backend/API)
const orders = [
    {
        _id: "order001",
        date: "2025-05-14T12:45:00Z",
        status: "Shipped",
        totalAmount: 14998,
        items: [
            {
                name: "Nike Air Max",
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
                price: 7499,
                quantity: 1,
            },
            {
                name: "Adidas Hoodie",
                image: "https://media.istockphoto.com/id/154960461/photo/red-sweat-shirt-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=Dt1h6jsUfwyJolpalOYanvF5kG6VTWhjDI1zVcbdYJY=",
                price: 7499,
                quantity: 1,
            },
        ],
    },
    {
        _id: "order002",
        date: "2025-05-12T10:20:00Z",
        status: "Delivered",
        totalAmount: 2499,
        items: [
            {
                name: "Men's Jeans",
                image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600",
                price: 2499,
                quantity: 1,
            },
        ],
    },
];

const getStatusColor = (status) => {
    switch (status) {
        case "Pending":
            return "warning";
        case "Shipped":
            return "info";
        case "Delivered":
            return "success";
        default:
            return "default";
    }
};

const OrderPage = () => {
    return (
        <Container sx={{ mt: 4, minHeight: '81vh' }}>
            <Helmet>
                <title>Your Order</title>
                <meta name="description" content='orders' />
            </Helmet>
            <Typography variant="h4" gutterBottom fontWeight={700}>
                My Orders
            </Typography>
            {orders.length === 0 ? (
                <Typography>No orders placed yet.</Typography>
            ) : (
                orders.map((order) => (
                    <Card key={order._id} sx={{ mb: 4, }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6">Order ID: {order._id}</Typography>
                                <Chip label={order.status} color={getStatusColor(order.status)} />
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                Ordered on: {new Date(order.date).toLocaleString()}
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            {order.items.map((item, index) => (
                                <Grid
                                    key={index}
                                    container
                                    spacing={2}
                                    alignItems="center"
                                    sx={{ mb: 2 }}
                                >
                                    <Grid item xs={3} sm={2} sx={{minWidth: '120px' }}>
                                        <CardMedia
                                            component="img"
                                            height="80"
                                            image={item.image}
                                            alt={item.name}
                                            sx={{ borderRadius: 1, objectFit: 'contain' }}
                                        />
                                    </Grid>
                                    <Grid item xs={9} sm={6}>
                                        <Typography>{item.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Quantity: {item.quantity}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4} textAlign="right">
                                        <Typography variant="h6">₹{item.price}</Typography>
                                    </Grid>
                                </Grid>
                            ))}

                            <Divider sx={{ mt: 2 }} />
                            <Box textAlign="right" mt={2}>
                                <Typography variant="h6">Total: ₹{order.totalAmount}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ))
            )}
        </Container>
    );
};

export default OrderPage;
