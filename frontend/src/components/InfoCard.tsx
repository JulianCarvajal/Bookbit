import React from "react";
import "./InfoCard.css";

interface InfoCardProps {
  title: string;
  attribute1: string;
  value1: string;
  attribute2: string;
  value2: string;
}

export default function InfoCard ({ title, attribute1, value1, attribute2, value2 }: InfoCardProps) {
  return (
    <div className="info-card">
      <h3 className="info-card-title">{title}</h3>
      <p className="info-card-attribute">
        <strong>{attribute1}:</strong> {value1}
      </p>
      <p className="info-card-attribute">
        <strong>{attribute2}:</strong> {value2}
      </p>
    </div>
  );
};