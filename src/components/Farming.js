import React, { useState, useEffect } from "react";
import "./Farming.css"; // Import the CSS file for styling

const FARMING_DURATION = 6 * 60 * 60 * 1; // 6 hours in milliseconds
const COINS_TO_FARM = 150;
const FARMING_INTERVAL = 1000; // 1 second

function Farming({ onFarmingComplete }) {
  const [isFarming, setIsFarming] = useState(false);
  const [progress, setProgress] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(FARMING_DURATION);
  const [hasFarmingCompleted, setHasFarmingCompleted] = useState(false);

  // Calculate and update progress and coin earnings based on stored start time
  const updateProgress = () => {
    const startTime = parseInt(localStorage.getItem("farmingStartTime"), 10);
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;

    if (elapsedTime >= FARMING_DURATION) {
      setProgress(100);
      setCoinsEarned(COINS_TO_FARM);
      setIsFarming(false);
      setHasFarmingCompleted(true);
      localStorage.removeItem("farmingStartTime");
      localStorage.removeItem("isFarming");
    } else {
      const progressPercentage = (elapsedTime / FARMING_DURATION) * 100;
      const earned = Math.floor(
        (elapsedTime / FARMING_DURATION) * COINS_TO_FARM
      );
      setProgress(progressPercentage);
      setCoinsEarned(earned);
      setTimeRemaining(FARMING_DURATION - elapsedTime);
    }
  };

  // Convert milliseconds to hours, minutes, and seconds
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  // Restore state from localStorage when the component mounts
  useEffect(() => {
    const storedStartTime = localStorage.getItem("farmingStartTime");
    const storedIsFarming = localStorage.getItem("isFarming") === "true";

    if (storedIsFarming && storedStartTime) {
      setIsFarming(true);
      updateProgress();
    }
  }, []);

  // Update progress and coins earned continuously every second
  useEffect(() => {
    let interval;
    if (isFarming) {
      interval = setInterval(() => {
        updateProgress();
      }, FARMING_INTERVAL);
    }

    return () => clearInterval(interval); // Cleanup interval when component unmounts
  }, [isFarming]);

  const handleStartFarming = () => {
    const startTime = Date.now();
    localStorage.setItem("farmingStartTime", startTime);
    localStorage.setItem("isFarming", true);

    setIsFarming(true);
    setProgress(0);
    setCoinsEarned(0);
    setHasFarmingCompleted(false);
    setTimeRemaining(FARMING_DURATION);
  };

  const handleClaimCoins = () => {
    // Handle coin claim and reset state
    onFarmingComplete(COINS_TO_FARM);
    setProgress(0);
    setCoinsEarned(0);
    setHasFarmingCompleted(false);
    localStorage.removeItem("farmingStartTime");
    localStorage.removeItem("isFarming");
  };

  return (
    <div className="farming-section">
      <h2>Farming</h2>
      {hasFarmingCompleted ? (
        <button onClick={handleClaimCoins} className="claim-button">
          Claim {COINS_TO_FARM} Coins
        </button>
      ) : (
        <div
          className="progress-container"
          onClick={!isFarming ? handleStartFarming : null}
          style={{ cursor: isFarming ? "default" : "pointer" }}
        >
          <div className="progress-bar" style={{ width: `${progress}%` }}>
            {isFarming ? (
              <span className="progress-text">
                {coinsEarned} Coins Earned - Time remaining:{" "}
                {formatTime(timeRemaining)}
              </span>
            ) : (
              <span className="progress-text">Click to Start Farming</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Farming;
