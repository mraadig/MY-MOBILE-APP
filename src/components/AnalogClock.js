// src/components/AnalogClock.js
import React, { useEffect, useRef } from 'react';
import '../styles/AnalogClock.css';

const AnalogClock = ({ speed }) => {
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const angleRef = useRef(0); // Ref for angle to avoid recalculating

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const radius = canvas.height / 2;

    const drawClock = () => {
      // Clear the entire canvas to remove previous drawings
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set origin to the center of the canvas
      ctx.save(); // Save current state
      ctx.translate(radius, radius);

      // Draw clock face
      ctx.beginPath();
      ctx.arc(0, 0, radius - 10, 0, 2 * Math.PI); // Slightly smaller to fit within the canvas
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.strokeStyle = 'black';
      ctx.stroke();

      // Draw clock hand
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.rotate(angleRef.current);
      ctx.lineTo(0, -radius + 10); // Ensure it stays within the visible canvas area
      ctx.stroke();
      ctx.restore(); // Restore previous state

      // Update the angle for the next frame
      angleRef.current -= speed * 0.01; // Adjust speed here
    };

    // Clear previous interval if any
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set up the interval for drawing the clock
    intervalRef.current = setInterval(drawClock, 1000 / speed);

    // Clean up the interval on component unmount or speed change
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [speed]);

  return <canvas ref={canvasRef} width="200" height="200" className="analog-clock"></canvas>;
};

export default AnalogClock;
