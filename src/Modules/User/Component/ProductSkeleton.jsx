import { Box, Card, CardContent, Button, Typography } from '@mui/material'

export default function ProductSkeleton() {
  return (
    <Card>
    <CardContent>
        <Typography variant="h5" gutterBottom noWrap fontWeight={800}>
          name
        </Typography>

        <Typography variant="body2" color="text.secondary" noWrap fontWeight={600}>
          description
        </Typography>

        {/* Ratings */}
        <Box mt={1} display='flex' alignItems='end'>
          {/* <Rating value={ratings} precision={0.5} readOnly /> */}
          <Typography variant="body2" color="text.secondary" ml={1}>
            rating
          </Typography>
        </Box>

        {/* Price and Discount */}
        <Box mt={1}>
            <Box sx={{ display: 'flex', alignItems: 'end', gap: 1, mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }} color="primary">
                ₹discountedPrice
              </Typography>
              <Typography Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary', paddingBottom: 0.5 }}>
                ₹price
              </Typography>
            </Box>
        </Box>
      </CardContent>

        <Button size="small" color="primary" variant="contained" fullWidth >
          Add to Cart
        </Button>
    </Card>
  )
}
