import '../CSS/Home.css';
import ProductCard from '../Component/ProductCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const Items = [
    { name: 'Electronics', image: 'https://rukminim2.flixcart.com/flap/80/80/image/22fddf3c7da4c4f4.png?q=100' },
    { name: 'Food', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/cereal-flake/g/y/y/300-fitbhim-oats-ready-to-eat-breakfast-complete-family-original-imahby8musmdbnza.jpeg?q=70' },
    { name: 'Fashion', image: 'https://m.media-amazon.com/images/I/71d9avk-dAL._SX240_QL100_AC_SCLZZZZZZZ_.jpg' },
    { name: 'Furniture', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN1pG20i1X-k5Wgx55KrXKt_H6CR8vf2Ez5w&s' },
    { name: 'Clothes', image: 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PC_WF/WF1-186-116._SY116_CB636048992_.jpg' },
    { name: 'Books', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRBR-mt0e0QdDEe__7ET2yrGm9btSJpFNX-9JX49DgtuAYsibU3c3K2tiN46nxEqN4wGYNtVwImbCbA9FLHn6zD_1lh4rZfO2FR2jAgV3WqK7SZQvoTYmPR' },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:7000/products/') // Make sure your backend supports this route
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subCategory.toLowerCase().includes(searchTerm.toLowerCase()) 
    // toString(item.price) === toString(searchTerm) ||
    // item.discount ===(searchTerm)
  );

  return (
    <div className="Home">
      {/* Category Section */}
      <div className="category">
        <div className="category-card">
          {Items.map((item) => (
            <div className="category-item" key={item.name}>
              <div className="image">
                <img src={item.image} alt={item.name} />
              </div>
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Product Section */}
      <div className='product-container'>
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <CircularProgress />
          </div>
        ) : error ? (
          <Typography variant="h6" color="error" align="center" sx={{ mt: 2 }}>
            {error}
          </Typography>
        ) : (
          filteredProducts.map((item, index) => (
            <ProductCard product={item} key={item._id || index} onClick={() => navigate(`/product/${item._id}`)} />
          ))
        )}
      </div>
    </div>
  );
}
