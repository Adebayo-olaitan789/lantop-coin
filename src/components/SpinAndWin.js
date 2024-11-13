import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import "./SpinAndWin.css"; // Import the CSS file

const data = [
  { option: "10 Coins" },
  { option: "20 Coins" },
  { option: "30 Coins" },
  { option: "50 Coins" },
  { option: "100 Coins" },
  { option: "200 Coins" },
  { option: "500 Coins" },
  { option: "1000 Coins" },
];

function SpinGame({ onWinCoins }) {
  // Accept onWinCoins as a prop
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    const wonCoins = parseInt(data[prizeNumber].option); // Get the amount of coins won
    onWinCoins(wonCoins); // Pass the won coins back to the App component
  };

  return (
    <div className="spin-game-container">
      <div className="wheel-container">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={["#3e3e3e", "#df3428"]}
          textColors={["#ffffff"]}
          onStopSpinning={handleStopSpinning} // Use the new handleStopSpinning function
          outerBorderColor="#333"
          outerBorderWidth={10}
          innerRadius={20}
          radiusLineWidth={5}
          radiusLineColor="#fff"
          fontSize={14} /* Reduced font size */
        />
      </div>
      <button className="spin-button" onClick={handleSpinClick}>
        {mustSpin ? "Spinning..." : "Spin"}
      </button>
    </div>
  );
}

export default SpinGame;
