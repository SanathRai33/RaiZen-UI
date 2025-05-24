import { Card, Box, Stack, Skeleton, IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ProductSkeleton = () => {
  return (
    <Card className="product-card">
      {/* Left: Image Skeleton */}
      <Skeleton variant="rectangular" width={240} height={240} sx={{ borderRadius: 2 }} />

      {/* Right: Info */}
      <Box flex={1} height='90%' maxWidth={500} padding={1}>

        {/* Title & Ratings Skeleton */}
        <Skeleton variant="text" width="60%" height={32} />
        <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
          <Skeleton variant="rectangular" width={40} height={24} />
          <Skeleton variant="text" width="50%" />
        </Stack>

        {/* Description Skeleton */}
        <Box mt={1}>
          {[...Array(3)].map((_, idx) => (
            <Skeleton key={idx} variant="text" width="80%" />
          ))}
        </Box>

        {/* Category */}
        <Skeleton variant="text" width="40%" />

        {/* Price */}
        <Box display="flex" alignItems="center" gap={2} mt={1}>
          <Skeleton variant="text" width={60} />
          <Skeleton variant="text" width={40} />
          <Skeleton variant="text" width={40} />
        </Box>

        {/* Favorite Button */}
        <Box mt={1} display="flex" gap={2} alignItems="center">
          <IconButton disabled>
            <FavoriteBorderIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Right Badge Image */}
      <Box className="image">
        <Skeleton variant="rectangular" width={100} height={100} />
        <Skeleton variant="text" width={60} />
      </Box>
    </Card>
  );
};

export default ProductSkeleton;
