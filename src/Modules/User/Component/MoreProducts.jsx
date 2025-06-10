import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import '../CSS/Product.css'

const CategoryProducts = ({ products, currentProductId, category }) => {
  const navigate = useNavigate();

  const relatedProducts = products
    ?.filter(item => item.category === category && item._id !== currentProductId)
    .slice(0, 7);

  if (!relatedProducts || relatedProducts.length === 0) {
    return <Typography>No other products in this category.</Typography>;
  }

  return (
    <Box mt={4} py={4} className='MoreProduct'>
      <Typography variant="h5" fontWeight={700}>Other {category}</Typography>
      <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
        {relatedProducts.map(item => (
          <Box key={item._id} onClick={() => navigate(`/product/${item._id}`)} className="more-product-card" >
            <Box component="img" src={item.images?.[0]} alt={item.name} sx={{ width: 100, height: 100, objectFit: "cover", borderRadius: 2 }} />
            <Typography variant="body2" mt={1} textAlign="center" sx={{ width: "fit-content"}}>{item.name}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryProducts;
