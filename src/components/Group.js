import React, { useState } from 'react';
import { FaUser, FaCoins, FaClipboard } from 'react-icons/fa';
import './Friends.css'; // Import the CSS file for styling

function Friends() {
  const [referralLink] = useState("https://example.com/referral"); // Replace with your actual referral link

  const friends = [
    { id: 1, name: 'Alice', coins: 120, level: 3 },
    { id: 2, name: 'Bob', coins: 90, level: 2 },
    { id: 3, name: 'Charlie', coins: 150, level: 4 }
  ];

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      alert("Referral link copied to clipboard!");
    });
  };

  return (
    <div className="friends-page">
      <h1>List of Friends</h1>
      <div className="friends-list">
        {friends.map(friend => (
          <div key={friend.id} className="friend-item">
            <div className="friend-icon">
              {friend.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="friend-details">
              <div className="friend-name">
                <FaUser className="icon" /> {friend.name}
              </div>
              <div className="friend-coins">
                <FaCoins className="icon" /> {friend.coins} Coins
              </div>
              <div className="friend-level">
                Level: {friend.level}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="invite-section">
        <button className="invite-btn">Invite a Friend</button>
        <button className="copy-link-btn" onClick={copyReferralLink}>
          <FaClipboard className="icon" />
        </button>
      </div>
    </div>
  );
}

export default Friends;
