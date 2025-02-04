import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import BookCard from "../../components/BookCard";
import "./UserBooks.css";
import { Book, BookXUser } from "../../types/userTypes";
import { getUserBooks, deleteUserBook } from "../../services/bookService";

const UserBooks: React.FC = () => {
    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    const navigate = useNavigate();
    const [userBooks, setUserBooks] = useState<BookXUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        updateUserBooks();
    }, []);

    const updateUserBooks = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const booksData = await getUserBooks();
            setUserBooks(booksData);
        } catch (error) {
            setError("Error al cargar los libros. Por favor, intenta de nuevo.");
            console.error("Error fetching books:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteBook = async (bookToDelete: Book) => {
        try {
            await deleteUserBook(bookToDelete.id);
            setUserBooks(currentBooks => 
                currentBooks.filter(book => book.id !== bookToDelete.id)
            );

            // Mostrar mensaje de éxito
            setSuccessMessage(`"${bookToDelete.name}" se ha eliminado a tu biblioteca`);
            
            // Ocultar el mensaje después de 3 segundos
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);

        } catch (error) {
            console.error("Error al eliminar el libro:", error);
            setError("Error al eliminar el libro. Por favor, intenta de nuevo.");
        }
    };

    if (isLoading) {
        return (
            <div className="user-books">
                {user && <Header user={user} />}
                <div className="user-books-container">
                    <p>Cargando libros...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="user-books">
            {user && <Header user={user} />}
            <div className="user-books-container">
                <div className="content">
                    <h2 className="user-books-title">Tus libros</h2>

                    {/* Mensajes de éxito y error */}
                    {successMessage && (
                        <div className="success-message">
                            {successMessage}
                            <button 
                                onClick={() => setSuccessMessage(null)} 
                                className="close-message"
                            >
                                ×
                            </button>
                        </div>
                    )}

                    {error && (
                        <div className="error-message">
                            {error}
                            <button 
                                onClick={() => setError(null)} 
                                className="close-error"
                            >
                                ×
                            </button>
                        </div>
                    )}
                    <div className="books-slider-container">
                        {userBooks.length > 0 ? (
                            userBooks.map((userBook) => (
                                <BookCard
                                    key={userBook.book.id}
                                    book={userBook.book}
                                    bookPercentage={userBook.bookPercentaje}
                                    buttonText="Eliminar"
                                    onButtonClick={() => handleDeleteBook(userBook.book)}
                                />
                            ))
                        ) : (
                            <p className="no-books">No tienes libros en tu biblioteca.</p>
                        )}
                    </div>
                    <button 
                        className="add-books-button" 
                        onClick={() => navigate("/library")}
                    >
                        Añadir más libros
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserBooks;