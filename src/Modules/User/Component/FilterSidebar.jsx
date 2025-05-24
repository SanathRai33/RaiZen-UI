import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Divider,
  TextField,
} from "@mui/material";
import { useState } from "react";

const FilterSidebar = ({ filters, setFilters, brands, query = [] }) => {
  const [searchBrand, setSearchBrand] = useState("");

  // Handle brand selection
  const handleBrandChange = (brand) => {
    const updated = filters.brand.includes(brand)
      ? filters.brand.filter((b) => b !== brand)
      : [...filters.brand, brand];
    setFilters((prev) => ({ ...prev, brand: updated }));
  };

  // Handle price range slider
  const handlePriceChange = (event, newValue) => {
    setFilters((prev) => ({ ...prev, min: newValue[0], max: newValue[1] }));
  };

  // Filter brand list based on search
  const filteredBrands = brands.filter((b) =>
    b.toLowerCase().includes(searchBrand.toLowerCase())
  );

  return (
    <Box className='filter-container'>
        <Typography variant="h6" gutterBottom fontSize={16}>
          Search results for: <strong>{query}</strong>
        </Typography>

      <Typography variant="h6">
        Filters
      </Typography>
      
        

      <Divider sx={{ my: 2 }} />

      {/* PRICE RANGE */}
      <Typography variant="subtitle1" fontWeight={600}>
        Price
      </Typography>
      <Slider
        value={[filters.min, filters.max]}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={50000}
        sx={{ mt: 1, mb: 2 }}
      />

      <Divider sx={{ my: 2 }} />

      {/* BRANDS */}
      <Typography variant="subtitle1" fontWeight={600}>
        Brand
      </Typography>
      <TextField
        size="small"
        variant="outlined"
        placeholder="Search Brand"
        value={searchBrand}
        onChange={(e) => setSearchBrand(e.target.value)}
        fullWidth
        sx={{ mt: 1, mb: 2 }}
      />

      <FormGroup>
        {filteredBrands.slice(0, 6).map((brand, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={filters.brand.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />
            }
            label={brand}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default FilterSidebar;
