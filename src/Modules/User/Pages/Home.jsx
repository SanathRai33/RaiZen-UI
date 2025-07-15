import '../CSS/Home.css';
import ProductCard from '../Component/ProductCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import noResultAnimation from '../Assets/JSON/noResultAnimation.json';
// import Lottie from 'lottie-react';
// import ProductSection from '../Component/ProductSection';
import CategorySection from '../Component/CategorySection';
import HeroBanner from '../Component/BannerSection';
import TrustBadges from '../Component/TrustBadges';
import NewArrivals from './NewArrivals';
import Offers from './Offers';

export default function Home({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/products?search=${searchTerm}`);
        setProducts(res.data);
      } catch (error) {
        console.error("Search fetch error:", error);
        setError("Failed to load products");
      }
    };

    if (searchTerm !== "") {
      fetchData();
    } else {
      axios.get("http://localhost:7000/products")
        .then((res) => {
          setProducts(res.data);
        })
        .catch(() => {
          setError("Failed to load products");
        });
    }
  }, [searchTerm]);


  return (
    <div className="Home">

      <HeroBanner />
      
      <CategorySection />

      <NewArrivals />

      <Offers/>

      <TrustBadges/>

      <div className='product-container'>
        {error ? (
          <Typography variant="h6" color="error" align="center" sx={{}}>
            {/* <Lottie animationData={noResultAnimation} loop autoplay style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', overflow: 'hidden', objectFit: 'contain', backgroundColor: 'gray', borderRadius: '16px'}} /> */}
            <h1 className='animation'>Page not found</h1>
          </Typography>
        ) : (
          products.map((item, index) => (
            <ProductCard product={item} key={item._id || index} onClick={() => navigate(`/product/${item._id}`)} />
          ))
        )}
      </div>
    </div>
  );
}
