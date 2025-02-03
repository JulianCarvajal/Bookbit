import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserHome.css";
import { Header } from "../../components/Header";
import UserSection from "../../components/UserSection";
import UserDashboard from "../../components/UserDashboard";
import { getUserChallenges } from "../../services/challengesService";
import { AuthContext } from '../../context/AuthContext';
import { Challenge } from "../../types/userTypes";

export default function UserHome() {
    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    const [challenges, setChallenges] = useState<Challenge[]>([]);

    useEffect(() => {
        updateChallenges();
    }, []);

    const updateChallenges = async () => {
        try {
            const challengeData = await getUserChallenges();
            const activeChallenges: Challenge[] = challengeData.filter(
                (challenge: Challenge) => challenge.state.name !== 'completado'
            );
            setChallenges(activeChallenges);
        } catch (error) {
            console.error("Error fetching challenges:", error);
        }
    };

    if (!user) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="user-home">
            <Header user={user} />
            <main className="user-main">
                {/* Sección izquierda - Centro de Mando */}
                <UserDashboard user={user} />
                
                {/* Sección derecha - Retos y Librería */}
                <div className="user-content">
                    <UserSection 
                        title="Tus Retos" 
                        items={challenges.map(challenge => ({
                            title: challenge.name,
                            attribute1: "Libro",
                            value1: "challenge.book.name",
                            attribute2: "Estado",
                            value2: challenge.state.name,
                        })) || []} 
                        manageUrl="/userchallenges" 
                    />
                    <UserSection 
                        title="Tu biblioteca" 
                        items={user.books?.map(book => ({
                            title: book.name,
                            attribute1: "Autor",
                            value1: book.author,
                            attribute2: "Editorial",
                            value2: book.editorial,
                        }))} 
                        manageUrl="/userbooks" 
                    />
                </div>
            </main>
        </div>
    );
}
