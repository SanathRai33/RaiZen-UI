// import React, { useState } from 'react';
import '../CSS/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { Search, Store, UserCircle2Icon } from 'lucide-react';
import { useAuth } from '../../../Context/AuthContext'

export default function Navbar({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/search/${searchTerm.trim()}`);
      setSearchTerm(""); // optional: clear input after searching
    }
  };

  return (
    <div className="Navbar">
      <div className="brand">
        <h2 onClick={() => navigate('/')}>RaiZen</h2>
      </div>

      <div className="searchBar">
        <Search size={18} className="search-icn" />
        <input type="text" placeholder="Search any products in RaiZen" value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown}
        />
      </div>

      <div className="btns">
        <button onClick={() => navigate('/become-a-seller')}>
          <Store />
          <p>Become a Seller</p>
        </button>
        {user ? (
          <button onClick={logout}>
            <UserCircle2Icon />
            <p>Logout</p>
          </button>
        ) : (
          <button onClick={() => navigate("/login")}>
            <UserCircle2Icon />
            <p>Login</p>
          </button>
        )}
      </div>
    </div>
  );
}


// import { useAuth } from '../context/AuthContext';

// const Navbar = () => {
//   const { user, logout } = useAuth();

//   return (
//     <>
// {user ? (
//   <button onClick={logout}>Logout</button>
// ) : (
//   <button onClick={() => navigate("/login")}>Login</button>
// )}
//     </>
//   );
// };

// const { login } = useAuth();

// const handleLogin = async () => {
//   const res = await axios.post('/api/users/login', { email, password });
//   login(res.data); // sets token and user
//   navigate("/home");
// };
