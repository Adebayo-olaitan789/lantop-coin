import React, { useState } from "react";
import "./Earn.css";
import mark from "../asset/image/mark.jpg";

const tasks = [
  {
    id: 1,
    name: "Follow us on Twitter",
    platform: "Twitter",
    points: 200,
    link: "https://twitter.com",
  },
  {
    id: 2,
    name: "Like our Facebook page",
    platform: "Facebook",
    points: 250,
    link: "https://facebook.com",
  },
  {
    id: 3,
    name: "Follow us on Instagram",
    platform: "Instagram",
    points: 300,
    link: "https://instagram.com",
  },
];

function Earn({ onEarnPoints }) {
  // Receive onEarnPoints as a prop
  const [completedTasks, setCompletedTasks] = useState([]);
  const [claimedTasks, setClaimedTasks] = useState([]);

  const handleTaskCompletion = (taskId) => {
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks([...completedTasks, taskId]);
    }
  };

  const handleClaimPoints = (taskId, taskPoints) => {
    if (!claimedTasks.includes(taskId)) {
      setClaimedTasks([...claimedTasks, taskId]);
      onEarnPoints(taskPoints); // Call the function passed as a prop
    }
  };

  return (
    <div className="earn-section">
      <h1>Earn Points</h1>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <div className="task-details">
              <h3>{task.name}</h3>
              <p>Earn {task.points} points</p>
            </div>
            {!completedTasks.includes(task.id) ? (
              <a
                href={task.link}
                target="_blank"
                rel="noopener noreferrer"
                className="task-button"
                onClick={() => handleTaskCompletion(task.id)}
              >
                Follow on {task.platform}
              </a>
            ) : !claimedTasks.includes(task.id) ? (
              <button
                className="claim-button"
                onClick={() => handleClaimPoints(task.id, task.points)}
              >
                Claim {task.points} Points
              </button>
            ) : (
              <img src={mark} alt="Marked" className="mark-icon" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Earn;
