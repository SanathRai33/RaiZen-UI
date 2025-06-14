import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardMedia, CardContent, Skeleton, IconButton, Button, Grid, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from '../../../Context/CartContext';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null)
  const token = localStorage.getItem('RaiZenUserToken');

  // Fetch wishlist from backend
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get('http://localhost:7000/api/users/wishlist', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setWishlist(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching wishlist:', err.response?.data || err.message);
      }
    };
    fetchWishlist();
  }, [token]);

  const handleRemove = async (productId) => {
    console.log("Removing", productId);
    try {
      await axios.put(`http://localhost:7000/api/users/wishlist/${productId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlist(prev => prev.filter(item => item._id !== productId));
    } catch (err) {
      console.error('Error removing from wishlist:', err?.response?.data || err.message);
    }
  };

  const handleMoveToCart = async (item) => {
    console.log('k')
      try {
        const res = await axios.get(`http://localhost:7000/products/${item._id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    addToCart(product)
    handleRemove(item._id)
  };


  return (
    <Container maxWidth="md" sx={{ mt: 4, minHeight: '81vh', minWidth: '79%' }}>
      <Typography variant="h4" gutterBottom fontWeight={700}>Wishlist {wishlist.length > 0 ? `(${wishlist.length})` : ''}</Typography>
      {loading ? (
        Array.from({ length: 3 }).map((_, i) => (
          <Card sx={{ display: 'flex', mb: 2, width: '800px', ml: 6 }}>
            {/* Image Placeholder */}
            <Skeleton variant="rectangular" width={150} height={150} />

            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, pl: 2 }}>
              <CardContent>
                <Skeleton variant="text" width="60%" height={30} />
                <Skeleton variant="text" width="80%" height={20} sx={{ my: 1 }} />
                <Skeleton variant="text" width="40%" height={20} />

                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item>
                    <Skeleton variant="rectangular" width={120} height={36} />
                  </Grid>
                  <Grid item>
                    <Skeleton variant="circular" width={36} height={36} />
                  </Grid>
                </Grid>
              </CardContent>
            </Box>
          </Card>
        ))) :
        wishlist.length === 0 ?
          (
            <Typography>Your wishlist is empty.</Typography>
          ) : (
            wishlist.map(item => (
              <Card key={item._id} sx={{ display: 'flex', mb: 2, width: '800px', ml: 6 }}>
                <CardMedia component="img" sx={{ width: 150 }} image={item.images?.[0] || "/placeholder.jpg"} alt={item.name} />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600}>{item.name}</Typography>
                    <Typography variant="body2" py={1}>{item.description}</Typography>
                    <Typography variant="body2">Price: ₹{item.price}</Typography>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item>
                        <Button variant="outlined" startIcon={<AddShoppingCartIcon />} onClick={() => handleMoveToCart(item)} >
                          Move to Cart
                        </Button>
                      </Grid>
                      <Grid item>
                        <IconButton color="error" onClick={() => handleRemove(item._id)}>
                          <FavoriteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Box>
              </Card>
            ))
          )}
    </Container>
  );
};

export default Wishlist;
