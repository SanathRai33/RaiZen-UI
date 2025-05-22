import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  Switch,
  FormControlLabel,
} from '@mui/material';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discount: 0,
    category: '',
    subCategory: '',
    brand: '',
    stock: '',
    images: '',
    tags: '',
    isFeatured: false,
    offerExpiresAt: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      images: formData.images.split(',').map((url) => url.trim()),
      tags: formData.tags.split(',').map((tag) => tag.trim()),
      price: parseFloat(formData.price),
      discount: parseFloat(formData.discount),
      stock: parseInt(formData.stock),
    };

    try {
      const res = await axios.post('/api/products', payload);
      alert('Product added successfully!');
      setFormData({
        name: '',
        description: '',
        price: '',
        discount: 0,
        category: '',
        subCategory: '',
        brand: '',
        stock: '',
        images: '',
        tags: '',
        isFeatured: false,
        offerExpiresAt: '',
      });
      console.log(res)
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" mb={3}>
          Add New Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Product Name" name="name" value={formData.name} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Brand" name="brand" value={formData.brand} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField fullWidth type="number" label="Price" name="price" value={formData.price} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField fullWidth type="number" label="Discount (%)" name="discount" value={formData.discount} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth type="number" label="Stock" name="stock" value={formData.stock} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Category" name="category" value={formData.category} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Subcategory" name="subCategory" value={formData.subCategory} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Tags (comma-separated)" name="tags" value={formData.tags} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Image URLs (comma-separated)" name="images" value={formData.images} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth type="datetime-local" label="Offer Expires At" name="offerExpiresAt" InputLabelProps={{ shrink: true }} value={formData.offerExpiresAt} onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel control={<Switch checked={formData.isFeatured} onChange={handleChange} name="isFeatured" />} label="Mark as Featured"
              />
            </Grid>
          </Grid>
          <Box mt={3}>
            <Button type="submit" variant="contained" color="primary">
              Add Product
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AddProduct;
