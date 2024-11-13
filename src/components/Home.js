import React, { useState, useEffect } from "react";
import "./Home.css";
import Farming from "./Farming"; // Import the Farming component
import { FaBitcoin } from "react-icons/fa";

function Home({ totalCoins }) {
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    coins: totalCoins, // Initialize with totalCoins prop
  });

  useEffect(() => {
    // Whenever totalCoins prop changes, sync it with user.coins
    setUser((prevUser) => ({
      ...prevUser,
      coins: totalCoins,
    }));
  }, [totalCoins]);

  const handleFarmingComplete = (newCoins) => {
    setUser((prevUser) => ({
      ...prevUser,
      coins: prevUser.coins + newCoins, // Update coin count
    }));
  };

  return (
    <div>
      <div className="farming-feature">
        <h2>Farming Feature</h2>
        <Farming onFarmingComplete={handleFarmingComplete} />
      </div>

      <div className="user-info">
        <div className="user-initials">
          {user.firstName[0]}
          {user.lastName[0]}
        </div>
        <div className="coin-info">
          <FaBitcoin className="coin-icon" />
          {/* Display user.coins */}
          <span className="coin-number">{user.coins}</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
