import React from "react";
import { AchievementXUser } from "../types/userTypes";
import "./AchievementCard.css";

interface AchievementProps {
  achievementXUser: AchievementXUser;
}

const AchievementCard: React.FC<AchievementProps> = ({ achievementXUser }) => {
  const { achievement, progress, percentage, state, dateEarned } = achievementXUser;

  return (
    <div className={`achievement-card ${state.name === "completed" ? "completed" : "in-progress"}`}>
      <div className="achievement-info">
        <h3 className="achievement-name">{achievement.name}</h3>
        <p className="achievement-description">{achievement.description}</p>
      </div>

      <div className="achievement-progress">
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
        </div>
        <p className="progress-text">{progress}/{achievement.condition}</p>
      </div>

      <div className="achievement-state">
        <span className={`state-badge ${state}`}>{state.name === "completed" ? "Completado 🎉" : "En progreso ⏳"}</span>
        {state.name === "completed" && <p className="achievement-date">Obtenido el {new Date(dateEarned).toLocaleDateString()}</p>}
      </div>
    </div>
  );
};

export default AchievementCard;
