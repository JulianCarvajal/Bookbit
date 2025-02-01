import React from "react";
import { Link } from "react-router-dom";
import "./UserHome.css";
import { Header } from "../../components/Header";
import { Challenges } from "../../components/Challenges";
import { useNavigate } from "react-router-dom";

export default function UserHome() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const handleCompleteChallenges = (challengeId: string) => {
        const updatedChallenges = user.challenges.map((challenge: any) => {
            if (challenge.id === challengeId) {
                return {
                    ...challenge,
                    completed: true,
                };
            }
            return challenge;
        });

        const updatedUser = {
            ...user,
            challenges: updatedChallenges,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        navigate('/userhome');
    }

    const handleCancelChallenge = (challengeId: string) => {
        const updatedChallenges = user.challenges.filter((challenge: any) => challenge.id !== challengeId);

        const updatedUser = {
            ...user,
            challenges: updatedChallenges,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        navigate('/userhome');
    }

    return (
        <div className="user-home">
            <Header user={user} />
            {/* <button onClick={() => {
                localStorage.removeItem("user"); 
                navigate('/');
            }}>
                Cerrar sesión
            </button> */}

            <Challenges 
                challenges={user.challenges} 
                onCompleteChallenge={handleCompleteChallenges}
                onAbandonChallenge={handleCancelChallenge} />
        </div>
    )
}