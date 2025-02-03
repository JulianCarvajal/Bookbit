import React from "react";
import { useNavigate } from "react-router-dom";
import InfoCard from "./InfoCard";
import "./UserSection.css";

interface UserSectionProps {
  title: string;
  items: { title: string; attribute1: string; value1: string; attribute2: string; value2: string }[];
  manageUrl: string;
}

export default function UserSection ({ title, items, manageUrl }: UserSectionProps) {
  const navigate = useNavigate();

  return (
    <div className="user-section">
      <h2 className="section-title">{title}</h2>
      <div className="cards-container">
        {items.slice(0, 3).map((item, index) => (
          <InfoCard 
            key={index} 
            title={item.title} 
            attribute1={item.attribute1} 
            value1={item.value1}
            attribute2={item.attribute2}
            value2={item.value2}
          />
        ))}
      </div>
      <button className="manage-button" onClick={() => navigate(manageUrl)}>
        Gestionar
      </button>
    </div>
  );
};