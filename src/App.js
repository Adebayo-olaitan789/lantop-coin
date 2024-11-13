import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Earn from "./components/Earn";
import Friends from "./components/Friends";
import Group from "./components/Group";
import Wallet from "./components/Wallet";
import SpinAndWin from "./components/SpinAndWin";
import TabBar from "./components/TabBar";
import "./App.css";

function App() {
  const [totalCoins, setTotalCoins] = useState(150);
  const [lastWonCoins, setLastWonCoins] = useState(null); // To track the last won coins

  const handleEarnPoints = (earnedPoints) => {
    setTotalCoins((prevCoins) => prevCoins + earnedPoints);
  };

  const handleWinCoins = (wonCoins) => {
    setTotalCoins((prevCoins) => prevCoins + wonCoins);
    setLastWonCoins(wonCoins); // Store the last won coins
  };

  return (
    <Router>
      <div className="App">
        <TabBar />
        <Link to="/spin" className="spin-link">
          <button className="spin-top-button">Spin and Win Coins!</button>
        </Link>
        <Routes>
          <Route
            path="/home"
            element={
              <Home totalCoins={totalCoins} lastWonCoins={lastWonCoins} />
            }
          />
          <Route
            path="/earn"
            element={<Earn onEarnPoints={handleEarnPoints} />}
          />
          <Route path="/friends" element={<Friends />} />
          <Route path="/group" element={<Group />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route
            path="/spin"
            element={<SpinAndWin onWinCoins={handleWinCoins} />}
          />
          <Route
            path="/"
            element={
              <Home totalCoins={totalCoins} lastWonCoins={lastWonCoins} />
            }
          />
        </Routes>

        {/* Rainfall effect */}
        <div className="rain">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="rain-drop"></div>
          ))}
        </div>
      </div>
    </Router>
  );
}

export default App;
