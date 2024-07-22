// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth,googleProvider,signInWithPopup } from '../firebase';
import '../styles/Login.css';
import img from '../Assets/Button.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/post-login');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/post-login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
     
      <h1 style={{textAlign:'left'}}>Login to your account.</h1>
      <p style={{textAlign:'left'}}>Please sign in to your account </p>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder='Enter Email'
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder='Password'
            required
          />
          <p style={{textAlign:'right' ,color: 'orange' }}>Forgot password?</p>
        </div>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <button type="submit">Sign In</button>
      </form>
      <div className="separator-container">
        <hr />
        <p>Or login with</p>
        <hr />
      </div>
      <button className="google-button" onClick={handleGoogleLogin}>
        <img src={img} alt="Google Logo" />
      </button>
      <div className='donothaveacc'>
      <p>
        Don't have an account? <Link to="/signup">Register</Link>
      </p></div>
    </div>
  );
};

export default Login;
