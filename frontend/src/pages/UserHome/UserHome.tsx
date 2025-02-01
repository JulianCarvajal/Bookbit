import React from "react";
import { Link } from "react-router-dom";
import "./UserHome.css";
import { Header } from "../../components/Header";
import { Challenges } from "../../components/Challenges";
import { useNavigate } from "react-router-dom";

export default function UserHome() {
    const navigate = useNavigate();

    const token = localStorage.getItem("user");

    const fetchUserData = async () => {
        if (!token) {
          console.error('No hay token disponible');
          return;
        }
      
        try {
          const response = await fetch('http://localhost:4000/api/auth/me', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            throw new Error('Error al obtener los datos del usuario');
          }
      
          const userData = await response.json();
          console.log('Datos del usuario:', userData); // Aquí obtienes nombre, monedas, etc.
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      };

    const user = fetchUserData();

    // const handleCompleteChallenges = (challengeId: string) => {
    //     const updatedChallenges = user.challenges.map((challenge: any) => {
    //         if (challenge.id === challengeId) {
    //             return {
    //                 ...challenge,
    //                 completed: true,
    //             };
    //         }
    //         return challenge;
    //     });

    //     const updatedUser = {
    //         ...user,
    //         challenges: updatedChallenges,
    //     };

    //     localStorage.setItem("user", JSON.stringify(updatedUser));
    //     navigate('/userhome');
    // }

    // const handleCancelChallenge = (challengeId: string) => {
    //     const updatedChallenges = user.challenges.filter((challenge: any) => challenge.id !== challengeId);

    //     const updatedUser = {
    //         ...user,
    //         challenges: updatedChallenges,
    //     };

    //     localStorage.setItem("user", JSON.stringify(updatedUser));
    //     navigate('/userhome');
    // }

    const handleclick = () =>{
        console.log(user)
    }
    return (
        <div className="user-home">
            <Header user={user} />
            <button onClick={handleclick}>hola</button>
            {/* <button onClick={() => {
                localStorage.removeItem("user"); 
                navigate('/');
            }}>
                Cerrar sesión
            </button> */}

            {/* <Challenges 
                challenges={user.challenges} 
                onCompleteChallenge={handleCompleteChallenges}
                onAbandonChallenge={handleCancelChallenge} /> */}
        </div>
    )
}