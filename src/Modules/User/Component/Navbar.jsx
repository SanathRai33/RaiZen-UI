import React from 'react';
import '../CSS/Navbar.css'
import { useNavigate } from 'react-router-dom';
import  { Search, Store, UserCircle2Icon } from 'lucide-react';

export default function Navbar() {

    const navigate = useNavigate();

    const handleHome = () => {
        navigate("/")
    }

    const handleRegister = () => {
        navigate("/register")
    }

    const handleSeller = () => {
        navigate("/become-a-seller")
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
            <div className="btns">
                <button onClick={handleSeller}><Store/><p>Become a Seller</p></button>
                <button onClick={handleRegister}><UserCircle2Icon/> <p>Register</p></button> 
            </div>
        </div>
    )
}