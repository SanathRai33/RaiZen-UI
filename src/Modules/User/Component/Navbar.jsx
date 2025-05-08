import React from 'react';
import '../CSS/Navbar.css'
import { NavLink, useNavigate } from 'react-router-dom';
import  { Search, Store, UserCircle2Icon } from 'lucide-react';

export default function Navbar() {

    const navigate = useNavigate();

    const handleHome = () => {
        navigate("/")
    }

    return (
        <div className='Navbar'>
            <div className="brand">
                <h2 onClick={handleHome}>RaiZen</h2>
            </div>
            <div className="searchBar">
                <Search size={18} className='search-icn'/>
                <input type="text" placeholder='Search any products in RaiZen' />
            </div>
            <div className="links">
                <NavLink to={"/seller"} className="link"><Store/><p>Become a Seller</p></NavLink>
            </div>
            <div className="button">
                <button><UserCircle2Icon/> <p>Register</p></button> 
            </div>
        </div>
    )
}
