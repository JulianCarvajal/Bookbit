import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Header } from "../../components/Header";
import ChallengeCard from "../../components/ChallengeCard";
import CreateChallengeModal from "../../components/CreateChallengeModal";
import "./UserChallenges.css";
import { useNavigate } from "react-router-dom";
import { Challenge, Book } from "../../types/userTypes";
import { getUserChallenges, addChallenges, completeChallenge } from "../../services/challengesService";

const UserChallenges: React.FC = () => {
    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    const navigate = useNavigate();
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        updateChallenges();
    }, []);

    const updateChallenges = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const challengeData = await getUserChallenges();
            setChallenges(challengeData);
        } catch (error) {
            setError("Error al cargar los retos. Por favor, intenta de nuevo.");
            console.error("Error fetching challenges:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateChallenge = async (challengeToAdd: {
        title: string;
        book: Book;
        pages: number;
        deathLine: number;
      }) => {
        try {
            setError(null);
            await addChallenges( challengeToAdd.title, challengeToAdd.book, challengeToAdd.pages, challengeToAdd.deathLine);

            updateChallenges();
            setSuccessMessage(`"${challengeToAdd.title}" se ha creado con éxito`);
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
            
        } catch (error) {
            setError("Error al agregar el reto. Por favor, intenta de nuevo.");
            console.error("Error al agregar el reto:", error);
        } finally {
            setIsModalOpen(false);
        }
    };

    const handleCompleteChallenge = async (challengeToComplete: Challenge) => {
        try {
            setError(null);
            await completeChallenge(challengeToComplete.id);
            setChallenges(prevChallenges => 
                prevChallenges.filter(challenge => challenge.id !== challengeToComplete.id)
            );
            setSuccessMessage(`"${challengeToComplete.name}" se ha completado con éxito`);
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
            
        } catch (error) {
            setError("Error al completar el reto. Por favor, intenta de nuevo.");
            console.error("Error al completar el reto:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="challenge-page">
                {user && <Header user={user} />}
                <div className="challenge-container">
                    <p>Cargando retos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="challenge-page">
            {user && <Header user={user} />}
            <div className="challenges-container">
                <div className="content">
                    <h2 className="challenge-title">Tus retos</h2>
                    
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    {error && <div className="error-message">{error}</div>}

                    <div className="challenges-grid">
                        {challenges.length > 0 ? (
                            challenges.map(challenge => (
                                <ChallengeCard 
                                    key={challenge.id} 
                                    challenge={challenge}
                                    onComplete={handleCompleteChallenge}
                                    onDelete={handleCompleteChallenge}
                                />
                            ))
                        ) : (
                            <p className="no-challenges">No tienes retos. ¡Crea uno ahora!</p>
                        )}
                    </div>

                    <button className="create-challenge-button" onClick={() => setIsModalOpen(true)}>
                        {challenges.length > 0 ? "Crear un nuevo reto" : "Crea tu primer reto"}
                    </button>
                </div>
            </div>

            <button 
                className="add-books-button" 
                onClick={() => navigate("/userhome")}
            >
                Vuelve a tu perfil
            </button>

            {isModalOpen && (
                <CreateChallengeModal 
                    books={user?.books || []}
                    onClose={() => setIsModalOpen(false)} 
                    onCreate={handleCreateChallenge}
                />
            )}
        </div>
    );
};

export default UserChallenges;