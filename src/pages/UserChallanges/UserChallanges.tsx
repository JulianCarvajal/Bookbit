import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Header } from "../../components/Header";
import ChallengeCard from "../../components/ChallengeCard";
import CreateChallengeModal from "../../components/CreateChallengeModal";
import "./UserChallenges.css";
import { useNavigate } from "react-router-dom";
import { BookXUser, Challenge, User } from "../../types/userTypes";
import { getUserChallenges, addChallenges, completeChallenge, deleteUserChallenge } from "../../services/challengesService";
import { getUserBooks } from "../../services/bookService";

const UserChallenges: React.FC = () => {
    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    const navigate = useNavigate();
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [userBooks, setUserBooks] = useState<BookXUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        updateChallenges();
        updateUserBooks();
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

    const updateUserBooks = async () => {
        try {
            const booksData = await getUserBooks();
            setUserBooks(booksData);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const handleCreateChallenge = async (challengeToAdd: {
        title: string;
        pages: number;
        deathLine: number;
      }, bookId: number) => {
        try {
            setError(null);
            await addChallenges( 
                challengeToAdd.title, 
                challengeToAdd.pages, 
                challengeToAdd.deathLine,
                bookId
            );

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
            console.log(challengeToComplete);
            setError(null);
            await completeChallenge(
                challengeToComplete.id, 
                challengeToComplete.book.id
            );
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

    const handleDeleteChallenge = async (challengeToDelete: Challenge) => {
        try {
            setError(null);
            await deleteUserChallenge(challengeToDelete.id);
            setChallenges(prevChallenges => 
                prevChallenges.filter(challenge => challenge.id !== challengeToDelete.id)
            );
            setSuccessMessage(`"${challengeToDelete.name}" se ha eliminado con éxito`);
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
            
        } catch (error) {
            setError("Error al eliminar el reto. Por favor, intenta de nuevo.");
            console.error("Error al eliminar el reto:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="challenges-page">
                {user && <Header user={user} />}
                <div className="challenge-container">
                    <p>Cargando retos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="challenges-page">
            {user && <Header user={user} />}
            <div className="challenges-wrapper">
                <div className="content">
                    <h2 className="challenges-title">Tus retos</h2>
                    
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    {error && <div className="error-message">{error}</div>}

                    <div className="challenges-grid">
                        {challenges.length > 0 ? (
                            challenges.map(challenge => (
                                <ChallengeCard 
                                    key={challenge.id} 
                                    challenge={challenge}
                                    onComplete={handleCompleteChallenge}
                                    onDelete={handleDeleteChallenge}
                                />
                            ))
                        ) : (
                            <p className="no-challenges">No tienes retos. ¡Crea uno ahora!</p>
                        )}
                    </div>

                    <button className="challenges-create-button" onClick={() => setIsModalOpen(true)}>
                        {challenges.length > 0 ? "Crear un nuevo reto" : "Crea tu primer reto"}
                    </button>
                </div>
            </div>

            <button 
                className="go-home-button" 
                onClick={() => navigate("/userhome")}
            >
                Vuelve a tu perfil
            </button>

            {isModalOpen && (
                <CreateChallengeModal 
                    books={userBooks.map(userBook => userBook.book) || []}
                    onClose={() => setIsModalOpen(false)} 
                    onCreate={handleCreateChallenge}
                />
            )}
        </div>
    );
};

export default UserChallenges;