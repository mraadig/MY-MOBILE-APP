// src/utils/shareableLink.js
export const generateShareableLink = (sliderValue) => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/tracking?speed=${sliderValue}`;
  };
  