import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaTasks, FaUsers, FaWallet } from 'react-icons/fa';
import './TabBar.css';  // Import the CSS file for styling

function TabBar() {
  return (
    <div className="tab-bar">
      <Link to="/home" className="tab-item">
        <FaHome className="tab-icon" />
        <span className="tab-text">Home</span>
      </Link>
      <Link to="/earn" className="tab-item">
        <FaTasks className="tab-icon" />
        <span className="tab-text">Earn</span>
      </Link>
	  
      <Link to="/friends" className="tab-item">
        <FaUsers className="tab-icon" />
        <span className="tab-text">Friends</span>
      </Link>
	  
	  <Link to="/Group" className="tab-item">
        <FaUsers className="tab-icon" />
        <span className="tab-text">Squad</span>
      </Link>
	  
      <Link to="/wallet" className="tab-item">
        <FaWallet className="tab-icon" />
        <span className="tab-text">Wallet</span>
      </Link>
    </div>
  );
}

export default TabBar;
