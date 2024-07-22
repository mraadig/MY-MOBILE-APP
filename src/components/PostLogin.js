// src/components/PostLogin.js
import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../styles/PostLogin.css';
import successIcon from '../Assets/success.png'; // Replace with your success icon

const PostLogin = () => {
  const navigate = useNavigate();

  const handleTrackingClick = () => {
    navigate('/tracking');
  };


  return (
    <div className="post-login-container">
      <div className="post-login-box">
        <img src={successIcon} alt="Success" className="success-icon" />
        <h1>Login Successful</h1>
        <button onClick={handleTrackingClick}>Go to Tracking Screen</button>
        <Link to="/login" className="logout-link">Logout</Link>
      </div>
    </div>
  );
};

export default PostLogin;
