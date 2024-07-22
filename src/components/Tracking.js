import React, { useState, useEffect } from 'react';
import '../styles/Tracking.css';
import { Link } from 'react-router-dom';
import AnalogClock from './AnalogClock';
import Slider from './Slider';
import { generateShareableLink } from '../utils/shareableLink';
import axios from 'axios';

const Tracking = () => {
  const [sliderValue, setSliderValue] = useState(1);
  const [quote, setQuote] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(''); // State for copy feedback

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get('https://api.api-ninjas.com/v1/quotes?category=happiness', {
          headers: {
            'X-Api-Key': 'tb0W8YEs+ZRkXdy/lOsP2Q==ayZ4WGS1hCuDZHdM' // Replace with your actual API key if required
          }
        });
        if (response.data.length > 0) {
          setQuote(response?.data[0]?.quote); // Correct path to quote
        } else {
          setError('No quotes found');
        }
      } catch (error) {
        setError('Error fetching quote: ' + error.message);
        console.error('Error fetching quote:', error);
      }
    };

    fetchQuote();
    const intervalId = setInterval(fetchQuote, 5000); // Fetch new quote every 5 seconds

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const handleShareButtonClick = () => {
    const shareableLink = generateShareableLink(sliderValue);
    navigator.clipboard.writeText(shareableLink)
      .then(() => {
        setCopySuccess('Link copied to clipboard!');
        console.log('Shareable Link:', shareableLink);
      })
      .catch(err => {
        setCopySuccess('Failed to copy link.');
        console.error('Failed to copy link:', err);
      });
  };

  return (
    <div className='trackScreen'>
    <div className="tracking-container">
      <AnalogClock speed={sliderValue} />
      <Slider value={sliderValue} onChange={handleSliderChange} />
      <button className="share-button" onClick={handleShareButtonClick}>
        Share
      </button>
      {copySuccess && <p className="copy-feedback">{copySuccess}</p>} {/* Display feedback */}
      <div className="quote-container">
        {error ? <p>{error}</p> : <p>{quote}</p>}
      </div>
      <Link to="/login" className='trackLogout'>Logout</Link>
    </div>
    </div>
  );
};

export default Tracking;
