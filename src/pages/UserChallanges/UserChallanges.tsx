import React from "react";
import "./UserChallenges.css";
import { Challenge } from "../../types/userTypes";
// import ChallengeCard from "../components/ChallengeCard";

interface UserChallengesProps {
    challenges: Challenge[];
}

export default function UserChallenges({ challenges }: UserChallengesProps) {
    // Filtrar retos activos y completados
    const activeChallenges = challenges.filter(challenge => challenge.id_status === 1);
    const completedChallenges = challenges.filter(challenge => challenge.id_status === 2);

    // Función para eliminar un reto
    const handleDeleteChallenge = (id: number) => {
        console.log("Eliminar reto con ID:", id);
        // Aquí se puede implementar la lógica para eliminar el reto del estado/backend
    };

    return (
        <div className="user-challenges">
            <h1 className="title">Gestión de Retos</h1>
            
            <section className="active-challenges">
                <h2>Retos Activos</h2>
                <div className="challenges-container">
                    {/* {activeChallenges.map((challenge) => (
                        <ChallengeCard 
                            key={challenge.id} 
                            challenge={challenge} 
                            onDelete={() => handleDeleteChallenge(challenge.id)}
                        />
                    ))} */}
                </div>
            </section>
            
            <section className="completed-challenges">
                <h2>Retos Completados</h2>
                <div className="completed-container">
                    {completedChallenges.map((challenge) => (
                        <div key={challenge.id} className="completed-challenge">
                            {challenge.title}
                        </div>
                    ))}
                </div>
            </section>

            <button className="create-challenge-button">Crear Nuevo Reto</button>
        </div>
    );
};
// Recuperar el usuario.
// const updateUserChallenges = (updatedChallenges: any[]) => {
    //     if (!user) return;
    //     const updatedUser = { ...user, challenges: updatedChallenges };
    //     setUser(updatedUser);
    //     localStorage.setItem("user", JSON.stringify(updatedUser));
    // };

    // const handleCompleteChallenges = (challengeId: string) => {
    //     if (!user) return;
    //     const updatedChallenges = user.challenges.map((challenge) =>
    //         challenge.id === challengeId ? { ...challenge, completed: true } : challenge
    //     );
    //     updateUserChallenges(updatedChallenges);
    // };

    // const handleCancelChallenge = (challengeId: string) => {
    //     if (!user) return;
    //     const updatedChallenges = user.challenges.filter((challenge) => challenge.id !== challengeId);
    //     updateUserChallenges(updatedChallenges);
    // };