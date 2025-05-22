import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CategoryProducts = ({ products, currentProductId, category }) => {
  const navigate = useNavigate();

  const relatedProducts = products
    ?.filter(item => item.category === category && item._id !== currentProductId)
    .slice(0, 7);

  if (!relatedProducts || relatedProducts.length === 0) {
    return <Typography>No other products in this category.</Typography>;
  }

  return (
    <Box mt={4}>
      <Typography variant="h5" fontWeight={700}>Other {category}</Typography>
      <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
        {relatedProducts.map(item => (
          <Box
            key={item._id}
            onClick={() => navigate(`/product/${item._id}`)}
            sx={{ cursor: "pointer", width: 150, height: 140, backgroundColor: "#fff", borderRadius: 2, p: 2, boxShadow: 1,
              display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box component="img" src={item.images?.[0]} alt={item.name} sx={{ width: 100, height: 100, objectFit: "cover", borderRadius: 2 }} />
            <Typography variant="body2" mt={1} textAlign="center">{item.name}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryProducts;
