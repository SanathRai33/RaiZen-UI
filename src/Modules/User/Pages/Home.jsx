import '../CSS/Home.css';
import ProductCard from '../Component/ProductCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Typography } from '@mui/material';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // start loading
        const res = await axios.get(`http://localhost:7000/products?search=${searchTerm}`);
        setProducts(res.data);
        setLoading(false); // stop loading
      } catch (error) {
        console.error("Search fetch error:", error);
        setError("Failed to load products");
        setLoading(false); // stop loading on error
      }
    };

    if (searchTerm !== "") {
      fetchData();
    } else {
      setLoading(true); // start loading
      axios.get("http://localhost:7000/products")
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load products");
          setLoading(false);
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
        {loading ? (
          <div>
            <CircularProgress />
          </div>
        ) : error ? (
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
