// src/components/SpinComponent.js
import React, { useState } from "react";
import "./Spinner.css"; // Import your CSS for styling

const SpinComponent = ({ onWinCoins }) => {
  const [spinning, setSpinning] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [10, 20, 30, 50, 100, 200, 500, 1000]; // Possible win amounts

  const handleSpin = () => {
    if (spinning) return; // Prevent spinning if already spinning
    setSpinning(true);

    const randomIndex = Math.floor(Math.random() * options.length);

    // Simulate spinning with a timeout
    setTimeout(() => {
      setSelectedOption(options[randomIndex]);
      onWinCoins(options[randomIndex]); // Call parent function to update coins
      setSpinning(false);
    }, 3000); // Spin duration
  };

  return (
    <div className="spin-container">
      <h2>Spin the Wheel!</h2>
      <div className={`wheel ${spinning ? "spinning" : ""}`}>
        {options.map((option, index) => (
          <div key={index} className="wheel-option">
            {option}
          </div>
        ))}
      </div>
      <button onClick={handleSpin} disabled={spinning}>
        {spinning ? "Spinning..." : "Spin"}
      </button>
      {selectedOption && (
        <p className="result-message">You won: {selectedOption} coins!</p>
      )}
    </div>
  );
};

export default SpinComponent;
