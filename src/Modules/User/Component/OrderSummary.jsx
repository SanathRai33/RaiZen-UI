import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

// Dummy product data
const products = [
  { name: "Product A", qty: 1, price: 899 },
  { name: "Product B", qty: 2, price: 499 },
];

const OrderSummary = () => {
  const total = products.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Order Summary</Typography>
      <List disablePadding>
        {products.map((item, index) => (
          <ListItem key={index} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={`${item.name} × ${item.qty}`} />
            <Typography variant="body2">₹{item.qty * item.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" fontWeight={600}>₹{total}</Typography>
        </ListItem>
      </List>
    </Box>
  );
};

export default OrderSummary;
