import { useState } from 'react';
import '../CSS/Register.css';
import { KeyRoundIcon, LucideLockKeyhole, Mail, Phone, User2 } from 'lucide-react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirm_password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirm_password) {
      return setMessage("Passwords do not match.");
    }

    try {
      const res = await axios.post('http://localhost:7000/api/users/register', {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password
      });
      console.log(res)

      setMessage("Registered successfully!");
      navigate('/login');
    } catch (error) {
      const msg = error.response?.data?.message;
      setMessage(msg);
    }
  };

  return (
    <div className='Register'>
      <Helmet>
        <title>RaiZen Resgister</title>
        <meta name="description" content='resgister' />
      </Helmet>

      <div className="image">
        <img src="https://cdn.pixabay.com/photo/2020/09/20/04/28/delivery-5585969_1280.jpg" alt="background" />
        <h1>RaiZen</h1>
      </div>

      <div className="form">
        <h1>Create Account</h1>

        <div className="input-fields">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          <User2 className='icon' size={20} />
        </div>

        <div className="input-fields">
          <label htmlFor="phone">Phone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          <Phone className='icon' size={20} />
        </div>

        <div className="input-fields">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          <Mail className='icon' size={20} />
        </div>

        <div className="input-fields">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          <KeyRoundIcon className='icon' size={20} />
        </div>

        <div className="input-fields">
          <label htmlFor="confirm_password">Confirm Password</label>
          <input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} />
          <LucideLockKeyhole className='icon' size={20} />
        </div>

        {message && <p style={{ color: 'red' }}>{message}</p>}

        <button onClick={handleSubmit}>Register</button>

        <p>By creating an account, you agree to RaiZen's <Link to="/">Condition of Use</Link> and <Link to="/">Privacy Notice</Link></p>
        <p>Already have an account? <Link to="/Login">Login</Link></p>
      </div>
    </div>
  );
}
