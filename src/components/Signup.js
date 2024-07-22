// src/components/Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider, signInWithPopup, analytics } from '../firebase';
import { logEvent } from 'firebase/analytics';
import '../styles/Signup.css';
import img from '../Assets/Button.png';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false); // Ensure this state is defined
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setAgreed(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!agreed) {
      setError('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully! Please log in.");
      logEvent(analytics, 'sign_up', { method: 'email' });
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Account created successfully with Google!");
      logEvent(analytics, 'sign_up', { method: 'google' });
      navigate('/post-login'); // Redirect to post-login page after successful signup
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h1>Create your new account</h1>
      <p style={{textAlign:'left'}}>Create an account to start looking for the food you like</p>
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
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder='Enter Username'
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
        </div>
        <div className="terms-container">
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={handleCheckboxChange}
            required
          />
          <label htmlFor="terms">
            I Agree with <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          </label>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Sign Up</button>
      </form>

      <div className="separator-container">
        <hr />
        <p>Or sign in with</p>
        <hr/>
      </div>

      <button className="google-button" onClick={handleGoogleSignup}>
        <img src={img} alt="Google Logo" />
      </button>
      <p style={{color:'black'}}>Already have an account? <Link to="/login">Sign In</Link></p>
    </div>
  );
};

export default Signup;
