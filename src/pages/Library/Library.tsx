import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Header } from "../../components/Header";
import BookCard from "../../components/BookCard";
import "./Library.css";
import { useNavigate } from "react-router-dom";
import { Book } from "../../types/userTypes";
import { getAllBooks, addUserBook } from "../../services/bookService";

const Library: React.FC = () => {
    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    const navigate = useNavigate();
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        updateBooks();
    }, []);

    const updateBooks = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const booksData = await getAllBooks();
            setBooks(booksData);
        } catch (error) {
            setError("Error al cargar los libros. Por favor, intenta de nuevo.");
            console.error("Error fetching books:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddBook = async (bookToAdd: Book) => {
        try {
            setError(null);
            await addUserBook(bookToAdd.id);
            
            // Actualizar el estado local removiendo el libro agregado
            setBooks(currentBooks => 
                currentBooks.filter(book => book.id !== bookToAdd.id)
            );
            
            // Mostrar mensaje de éxito
            setSuccessMessage(`"${bookToAdd.name}" se ha agregado a tu biblioteca`);
            
            // Ocultar el mensaje después de 3 segundos
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
            
        } catch (error) {
            setError("Error al agregar el libro. Por favor, intenta de nuevo.");
            console.error("Error al agregar el libro:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="library-page">
                {user && <Header user={user} />}
                <div className="library-container">
                    <p>Cargando libros...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="library-page">
            {user && <Header user={user} />}
            <div className="library-container">
                <div className="content">
                    <h2 className="library-title">Conoce todos nuestros libros</h2>
                    
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
                                className="close-message"
                            >
                                ×
                            </button>
                        </div>
                    )}

                    <div className="books-grid">
                        {books.length > 0 ? (
                            books.map((book) => (
                                <BookCard 
                                    key={book.id} 
                                    book={book} 
                                    buttonText="Agregar" 
                                    onButtonClick={() => handleAddBook(book)} 
                                />
                            ))
                        ) : (
                            <p className="no-books">No hay libros disponibles en este momento.</p>
                        )}
                    </div>
                    <button 
                        className="add-books-button" 
                        onClick={() => navigate("/userbooks")}
                    >
                        Vuelve a tus libros
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Library;