import { Card, CardMedia, CardContent, CardActions, Typography, Button, Chip, Rating, Box, } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';

const ProductCard = ({ product, onClick }) => {
  const {
    name,
    description,
    price,
    discount,
    ratings,
    images,
    isFeatured,
  } = product;

  // Calculate discounted price
  const discountedPrice = discount
    ? Math.trunc(price - (price * discount) / 100)
    : price;



  // const navigate = useNavigate();


  return (
    <Card sx={{ width: 320, boxShadow: 3, borderRadius: 1, position: 'relative', }} onClick={onClick} >
      <CardMedia component="img" height="200" image={images[0]} alt={name} width={300} sx={{ objectFit: 'cover' }} />

      {/* Featured Tag */}
      {isFeatured && (
        <Chip label="Featured" color="secondary" size="small" sx={{ position: 'absolute', top: 10, left: 10 }} />
      )}

      {discount > 0 ?
        (<Typography variant='body' color='white' borderRadius={4} pr={2} pl={2} fontSize={14}
          sx={{ position: 'absolute', top: 10, right: 10, backgroundColor: 'green', height: '22px', paddingTop: '2px' }}>{discount}% off</Typography>)
        :
        (<></>)}

      <CardContent>
        <Typography variant="h5" gutterBottom noWrap fontWeight={800}>
          {name}
        </Typography>

        <Typography variant="body2" color="text.secondary" noWrap fontWeight={600}>
          {description}
        </Typography>

        {/* Ratings */}
        <Box mt={1} display='flex' alignItems='end'>
          <Rating value={ratings} precision={0.5} readOnly />
          <Typography variant="body2" color="text.secondary" ml={1}>
            {ratings} ({Math.floor(Math.random() * 100)} reviews)
          </Typography>
        </Box>

        {/* Price and Discount */}
        <Box mt={1}>
          {discount > 0 ? (
            <Box sx={{ display: 'flex', alignItems: 'end', gap: 1, mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }} color="primary">
                ₹{discountedPrice}
              </Typography>
              <Typography Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary', paddingBottom: 0.5 }}>
                ₹{price}
              </Typography>
            </Box>
          ) : (
            <Typography variant="h6" color="primary">
              ₹{price}
            </Typography>
          )}
        </Box>
      </CardContent>

      <CardActions>
        <Button size="small" color="primary" variant="contained" fullWidth startIcon={<ShoppingCartIcon />} >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;

// https://cloud.mongodb.com/v2/67e59769eea3d45df9c7ca43#/metrics/replicaSet/67e598e650b1f63163ab32a2/explorer/RaiZenDB/product/find