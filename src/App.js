// src/App.js
import React, { useState } from 'react';
import './styles/App.css';
import Progressbutton from './Assets/Progress button.png';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [shownextbutton, setshownextbutton] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNextClick = () => {
    setCurrentStep(prevStep => prevStep + 1);
    setshownextbutton(prevCount => prevCount + 1);
  };

  const handleImageClick = () => {
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="content">
        <h1>We serve incomparable delicacies</h1>
        <p>
          All the best restaurants with their top menu waiting for you, they can't wait for your order!!
        </p>
        <div className="indicators">
          <span className={`dot ${currentStep === 0 ? 'active' : ''}`}></span>
          <span className={`dot ${currentStep === 1 ? 'active' : ''}`}></span>
          <span className={`dot ${currentStep === 2 ? 'active' : ''}`}></span>
        </div>
        {shownextbutton < 2 ? (
          <div className="buttons">
            <button className="button" onClick={handleNextClick}>Skip</button>
            <button className="button" onClick={handleNextClick}>Next →</button>
          </div>
        ) : (
          <div className="centered-button">
            <img src={Progressbutton} alt="Next" className="next-button-image" onClick={handleImageClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
