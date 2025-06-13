import { useState, useEffect } from "react";
import {
  Card, CardMedia, Typography, IconButton, Box, Stack
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import '../CSS/Product.css';
import { StarIcon } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";

const ProductCard = ({ product, onClick }) => {
  const { name, category, brand, description, price, discount, ratings, images } = product;
  const { user, token, refreshUser } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discountedPrice = discount
    ? Math.trunc(price - (price * discount) / 100)
    : price;

  // ✅ Set icon based on DB data (supports both ObjectId or string in wishlist)
  useEffect(() => {
    const wishlistIds = user?.wishlist?.map((item) =>
      typeof item === 'string' ? item : item._id
    );
    setIsWishlisted(wishlistIds?.includes(product._id));
  }, [user?.wishlist, product._id]);

  const handleFavorite = async (e) => {
    e.stopPropagation();

    if (!token) {
      console.warn("User not authenticated");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:7000/api/users/wishlist/${product._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ res.data is array of wishlist IDs
      const updatedWishlist = res.data.map(id =>
        typeof id === 'string' ? id : id._id
      );
      setIsWishlisted(updatedWishlist.includes(product._id));

      // ✅ Optionally update user context as well
      await refreshUser();
    } catch (err) {
      console.error("Error toggling wishlist", err);
    }
  };

  return (
    <Card className="product-card" onClick={onClick}>
      {/* Image */}
      <CardMedia
        component="img"
        image={images[0]}
        alt={name}
        sx={{ width: 240, height: 240, objectFit: "contain", borderRadius: 2 }}
      />

      {/* Info */}
      <Box flex={1} maxWidth={600}>
        <Typography variant="h5" fontWeight={700}>{name}</Typography>
        <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
          <Box
            display="inline-flex"
            alignItems="center"
            px={1}
            py={0.1}
            borderRadius={4}
            bgcolor="success.main"
            color="white"
            fontWeight={600}
            fontSize={12}
          >
            <StarIcon width={15} height={20} /> {ratings.toFixed(1)}
          </Box>
          <Typography variant="body2" color="text.secondary">
            {Math.floor(Math.random() * 10000)} Ratings & {Math.floor(Math.random() * 1000)} Reviews
          </Typography>
        </Stack>

        {/* Features */}
        <ul style={{ paddingLeft: "1.1rem", margin: "8px 0", fontSize: 14 }}>
          {description.split("|").slice(0, 5).map((line, idx) => (
            <li key={idx}>{line.trim()}</li>
          ))}
        </ul>

        <Typography>{brand} {category}</Typography>

        {/* Price */}
        <Box display="flex" alignItems="center" gap={2} mt={1}>
          <Typography variant="h6" fontWeight={700}>₹{discountedPrice}</Typography>
          {discount > 0 && (
            <>
              <Typography variant="body2" sx={{ textDecoration: "line-through", color: "text.secondary" }}>
                ₹{price}
              </Typography>
              <Typography variant="body2" color="green">
                {discount}% off
              </Typography>
            </>
          )}
        </Box>

        <Typography variant="body2" color="blue" fontWeight={600} fontSize={13}>
          Upto ₹{price - discountedPrice} Off on Exchange
        </Typography>

        {/* Wishlist Icon */}
        <Box mt={1} display="flex" gap={2} alignItems="center">
          <IconButton color="error" onClick={handleFavorite}>
            {isWishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>
      </Box>

      {/* Footer */}
      <Box className="image">
        <img
          src="https://cdn4.vectorstock.com/i/1000x1000/66/48/assured-rubber-stamp-vector-17186648.jpg"
          alt="stamp"
        />
        <Typography textAlign="center" fontWeight={700}>By RaiZen</Typography>
      </Box>
    </Card>
  );
};

export default ProductCard;
