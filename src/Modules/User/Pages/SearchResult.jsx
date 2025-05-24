import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Grid, } from "@mui/material";
import ProductCard from "../Component/ProductCard";
import FilterSidebar from "../Component/FilterSidebar";
import '../CSS/Product.css'
import ProductSkeleton from "../Component/ProductSkeleton";
import { Helmet } from "react-helmet";

export default function SearchResults() {
  const { query } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allBrands, setAllBrands] = useState([]);

  const [filters, setFilters] = useState({
    brand: [],
    min: 0,
    max: 50000,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const queryParams = new URLSearchParams({
          search: query,
          brand: filters.brand.join(","),
          min: filters.min,
          max: filters.max,
        }).toString();

        const res = await axios.get(`http://localhost:7000/products?${queryParams}`);
        setProducts(res.data);

        // Extract unique brand names from result
        const uniqueBrands = [...new Set(res.data.map((p) => p.brand))];
        setAllBrands(uniqueBrands);

        setLoading(false);
      } catch (err) {
        console.error("Search failed:", err);
        setError("Failed to fetch products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query, filters]);

  return (
    <Grid container spacing={2} className='search-result' >
      <Helmet>
        <title>Search results for: {query}</title>
        <meta name="description" content='login' />
      </Helmet>
      {/* Sidebar Filters */}
      <Grid item xs={12} md={3} className='filter-card'>
        <FilterSidebar filters={filters} setFilters={setFilters} brands={allBrands} query={query} />
      </Grid>

      {/* Products */}
      <Grid item xs={12} md={9} className='product-container'>

        {loading ? (
          <>
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : products.length === 0 ? (
          <Typography>No products found.</Typography>
        ) : (
          products.map((item) => (
            <ProductCard key={item._id} product={item} onClick={() => navigate(`/product/${item._id}`)} />
          ))
        )}

      </Grid>
    </Grid>
  );
}
