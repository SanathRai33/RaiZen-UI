import React from "react";
import { Box, Grid, Typography, Link, IconButton, Divider } from "@mui/material";
import { Facebook, Instagram, Twitter, YouTube, ShoppingCart } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#e1e1e1", color: "#333", pt: 5, pb: 2 }}>
      <Grid container spacing={4} justifyContent="center" sx={{ px: { xs: 2, md: 10 } }}>
        {/* Logo & About */}
        <Grid item xs={12} sm={6} md={3}>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <ShoppingCart color="primary" />
            <Typography variant="h6" fontWeight="bold">RaiZen</Typography>
          </Box>
          <Typography variant="body2">
            Your one-stop shop for everything you need—from fashion to electronics.
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={6} sm={6} md={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Quick Links</Typography>
          {["Home", "Shop", "About Us", "Contact"].map((text) => (
            <Link href="#" key={text} underline="none" color="inherit" display="block" sx={{ my: 0.5 }}>
              {text}
            </Link>
          ))}
        </Grid>

        {/* Support */}
        <Grid item xs={6} sm={6} md={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Support</Typography>
          {["Help Center", "Return Policy", "Terms of Service", "Privacy Policy"].map((text) => (
            <Link href="#" key={text} underline="none" color="inherit" display="block" sx={{ my: 0.5 }}>
              {text}
            </Link>
          ))}
        </Grid>

        {/* Social Media */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Follow Us</Typography>
          <Box display="flex" gap={1}>
            <IconButton href="#"><Facebook /></IconButton>
            <IconButton href="#"><Instagram /></IconButton>
            <IconButton href="#"><Twitter /></IconButton>
            <IconButton href="#"><YouTube /></IconButton>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Copyright */}
      <Typography variant="body2" align="center">
        © {new Date().getFullYear()} RaiZen. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
