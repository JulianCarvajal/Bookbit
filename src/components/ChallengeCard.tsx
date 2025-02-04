import React from "react";
import "./ChallengeCard.css";
import { Challenge } from "../types/userTypes";

interface ChallengeCardProps {
    challenge: Challenge;
    onComplete?: (challenge: Challenge) => void;
    onDelete?: (challenge: Challenge) => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onComplete, onDelete }) => {
    return (
        <div className="challenge-card">
            <h3 className="challenge-title">{challenge.name}</h3>
            <div className="challenge-info">
                {challenge.book && <p><strong>Libro:</strong> {challenge.book.name}</p>}
                <p><strong>Páginas por día:</strong> {challenge.pages}</p>
                <p><strong>State:</strong> {challenge.state.name}</p>
                <p><strong>Recompensa:</strong> {challenge.reward} monedas</p>
            </div>
            <div className="challenge-buttons">
                {/* Renderiza el botón solo si el estado NO es "completado" */}
                {challenge.state.name !== "completado" && (
                    <button className="challenge-complete-button" onClick={() => onComplete?.(challenge)}>
                        Completar
                    </button>
                )}
                <button className="challenge-delete-button" onClick={() => onDelete?.(challenge)}>
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default ChallengeCard;