import { NavLink } from 'react-router-dom';
import '../CSS/SecNav.css';
import Imgae from '../Assets/Images/image.png';
import  { ShoppingCart } from 'lucide-react';

export default function SecNav() {
  return (
    <div className='SecNav'>
      <NavLink to="/order">My Orders</NavLink>
      <NavLink to="/whishlist">Whishlist</NavLink>
      <NavLink to="/cart"> <ShoppingCart size={20}/> <p>Cart</p></NavLink>
      <div className="profile">
        <img src={Imgae} alt="Profile" />
      </div>
    </div>
  )
}
