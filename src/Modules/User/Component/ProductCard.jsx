import { Card, CardMedia, Typography, IconButton, Box, Stack, } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import '../CSS/Product.css'
import { StarIcon } from "lucide-react";

const ProductCard = ({ product, onClick }) => {
  const {
    name,
    category,
    brand,
    description,
    price,
    discount,
    ratings,
    images,
  } = product;

  const discountedPrice = discount
    ? Math.trunc(price - (price * discount) / 100)
    : price;

  const handleFavirote = (e) => {
    console.log("object");
    e.stopPropagation();
  }

  return (
    <Card className="product-card" onClick={onClick} >
      {/* Left: Product Image */}
      <CardMedia component="img" image={images[0]} alt={name}
        sx={{ width: 240, height: 240, objectFit: "contain", borderRadius: 2, }} />

      {/* Right: Info */}
      <Box flex={1} height='90%' maxWidth={600}>
        {/* Title & Ratings */}
        <Typography variant="h5" fontWeight={700}>
          {name}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
          <Box display="inline-flex" alignItems="center" px={1} py={0.1} borderRadius={4} gap='5px'
          bgcolor="success.main" color="white" fontWeight={600} fontSize={12}>
            <StarIcon sx={{ mr: 0.5 }}  width={15} height={20} /> {ratings.toFixed(1)}
          </Box>
          <Typography variant="body2" color="text.secondary">
            {Math.floor(Math.random() * 10000)} Ratings &{" "}
            {Math.floor(Math.random() * 1000)} Reviews
          </Typography>
        </Stack>

        {/* Description / features */}
        <ul style={{ paddingLeft: "1.1rem", margin: "8px 0", fontSize: 14 }}>
          {description
            .split("|")
            .slice(0, 5)
            .map((line, idx) => (
              <li key={idx}>{line.trim()}</li>
            ))}
        </ul>

        {/* Category */}
        <Box>
          <Typography>
            {brand} {category}
          </Typography>
        </Box>

        {/* Price */}
        <Box display="flex" alignItems="center" gap={2} mt={1}>
          <Typography variant="h6" fontWeight={700}>
            ₹{discountedPrice}
          </Typography>
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

        <Typography variant="body" color="blue" fontSize={13} fontWeight={600}>
          Upto ₹{price - discountedPrice} Off on Exchange
        </Typography>

        {/* Tags & Button */}
        <Box mt={1} display="flex" gap={2} alignItems="center">
          <IconButton color="error" onClick={handleFavirote}><FavoriteBorderIcon /></IconButton>
        </Box>
      </Box>
      <Box className='image'>
        <img src="https://cdn4.vectorstock.com/i/1000x1000/66/48/assured-rubber-stamp-vector-17186648.jpg" alt="y" />
        <Typography textAlign='center' fontWeight={700}>By RaiZen</Typography>
      </Box>
    </Card>
  );
};

export default ProductCard;
