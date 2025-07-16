import { Box, Grid, Typography, Paper, Button, Divider } from "@mui/material";
import OrderSummary from "../Component/OrderSummary";
import AddressForm from "../Component/AddressForm";
import PaymentOptions from "../Component/PaymentOption";
import { useState } from "react";
import { Helmet } from "react-helmet";

const Payment = () => {
  const [selectedPayment, setSelectedPayment] = useState("card");

  const handleConfirmPayment = () => {
    // Razorpay or other payment gateway logic here
    console.log("Processing payment with:", selectedPayment);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Helmet>
        <title>Checkout - Secure Payment</title>
      </Helmet>

      <Typography variant="h4" fontWeight={600} gutterBottom>
        Checkout
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>Delivery Address</Typography>
            <AddressForm />
          </Paper>

          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Payment Method</Typography>
            <PaymentOptions selected={selectedPayment} setSelected={setSelectedPayment} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <OrderSummary />
            <Divider sx={{ my: 2 }} />
            <Button fullWidth variant="contained" color="success" onClick={handleConfirmPayment}>
              Confirm & Pay
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Payment;
