import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Grid, Typography, Button, Rating, Chip, IconButton, Container,} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CircularProgress from "@mui/material/CircularProgress";
import CategoryProducts from "../Component/MoreProducts"; // Adjust the import path

const ProductFullView = () => {
  const { id } = useParams(); // get product ID from URL
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  // Fetch single product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  // Fetch all products for related display
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/products`);
        setAllProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchAllProducts();
  }, []);

  if (!product) return 
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <CircularProgress />
          </div>;

  const {
    name,
    description,
    price,
    stock,
    category,
    images,
    ratings,
    discount,
    isFeatured,
  } = product;

  const discountedPrice = price - (price * discount) / 100;

  return (
    <Container sx={{ py: 9, backgroundColor: '#f5f5f5', minWidth: '100%', paddingLeft: '100px' }}>
      <Grid container spacing={4} ml={16}>
        <Grid item xs={12} md={6}>
          <Box component="img" src={images?.[0]} alt={name}
            sx={{
              width: "100%",
              minHeight: 500,
              maxHeight: 500,
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} p={2} bgcolor='#f5f5f5' minWidth={600}>
          {isFeatured && <Chip label="Featured" color="primary" sx={{ mb: 1 }} />}
          <Typography variant="h4" fontWeight={700} gutterBottom>{name}</Typography>
          <Typography variant="body1" mb={1}>{description}</Typography>
          <Typography variant="subtitle1" color="text.secondary">Category: {category}</Typography>

          <Box display="flex" alignItems="center" my={2}>
            <Rating value={ratings} precision={0.5} readOnly />
            <Typography variant="body2" ml={1}>{ratings?.toFixed(1)} / 5</Typography>
          </Box>

          <Typography variant="h6" color="text.secondary" sx={{
            textDecoration: discount > 0 ? "line-through" : "none"
          }}>
            ₹{price}
          </Typography>

          {discount > 0 && (
            <Typography variant="h5" fontWeight={600} color="error">
              ₹{Math.trunc(discountedPrice)} <Chip label={`-${discount}%`} size="small" color="error" />
            </Typography>
          )}

          <Typography variant="body2" mt={2} color={stock > 0 ? "green" : "red"}>
            {stock > 0 ? `In Stock (${stock})` : "Out of Stock"}
          </Typography>

          <Box display="flex" gap={2} mt={6}>
            <Button variant="contained" color="warning" startIcon={<ShoppingCartIcon />} disabled={stock <= 0}>
              Add to Cart
            </Button>
            <IconButton color="error"><FavoriteBorderIcon /></IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Related Products Section */}
      <Box ml={4}>
        <CategoryProducts products={allProducts} currentProductId={id} category={category} />
      </Box>
    </Container>
  );
};

export default ProductFullView;
