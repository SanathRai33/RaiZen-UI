import '../CSS/Login.css';
import { KeyRoundIcon, Mail } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

// const handleSubmit = async () => {
//   try {
//     const res = await axios.post('http://localhost:7000/api/users/login', formData);

//     // ✅ Store token in localStorage
//     localStorage.setItem("RaiZenUserToken", res.data.token);
//     localStorage.setItem("RaiZenUserData", JSON.stringify(res.data.user));

//     setMessage('Login successful!');
//     navigate('/'); // redirect to homepage or dashboard
//   } catch (error) {
//     const msg = error.response?.data?.message || 'Login failed!';
//     setMessage(msg);
//   }
// };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:7000/api/users/login', formData);
      const { token, user } = res.data;

      login(user, token); // ✅ context login
      setMessage('Login successful!');
      navigate('/');
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed!';
      setMessage(msg);
    }
  };


  return (
    <div className='Login'>
      <Helmet>
        <title>RaiZen Login</title>
        <meta name="description" content='login' />
      </Helmet>

      <div className="form">
        <h1>Login</h1>

        <div className="input-fields">
          <label htmlFor="Email">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          <Mail className='icon' size={20} />
        </div>

        <div className="input-fields">
          <label htmlFor="Password">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          <KeyRoundIcon className='icon' size={20} />
        </div>

        {message && <p style={{ color: message.includes("success") ? "green" : "red" }}>{message}</p>}

        <button onClick={handleSubmit}>Login</button>

        <p>By creating an account, you agree to RaiZen's <Link to="/">Condition of Use</Link> and <Link to="/">Privacy Notice</Link></p>
        <p>You don't have an account? <Link to="/Register">Register</Link></p>
      </div>

      <div className="image">
        <img src="https://cdn.pixabay.com/photo/2020/09/20/04/28/delivery-5585969_1280.jpg" alt="background" />
        <h1>RaiZen</h1>
      </div>
    </div>
  );
}
