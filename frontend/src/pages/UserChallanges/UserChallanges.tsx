import React from "react";

export default function UserChallenges() {
    return (
        <div>
            <h1>Retos del usuario</h1>
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