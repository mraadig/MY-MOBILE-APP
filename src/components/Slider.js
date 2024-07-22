// src/components/Slider.js
import React from 'react';
import '../styles/Slider.css';

const Slider = ({ value, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="slider-container">
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={handleChange}
        className="slider"
      />
      <span className="slider-value">{value}</span>
    </div>
  );
};

export default Slider;
