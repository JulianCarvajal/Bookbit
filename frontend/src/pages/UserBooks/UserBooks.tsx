import React, { use, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import BookCard from "../../components/BookCard";
import "./UserBooks.css";
import { Book } from "../../types/userTypes";
import { getUserBooks, deleteUserBook } from "../../services/bookService";

const UserBooks: React.FC = () => {
    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    const navigate = useNavigate();
    const [userBooks, setUserBooks] = useState<Book[]>([]);

    useEffect(() => {
        updateUserBooks();
    }, []);

    useEffect(() => {
        updateUserBooks();
    }, [userBooks]);

    const updateUserBooks = async () => {
        const booksData = await getUserBooks();
        setUserBooks(booksData);
    };

    const handleDeleteBook = async (book: Book) => {
        try {
        const result = await deleteUserBook(book.id);
        if (result.error) {
            // Manejar el error, quizás mostrar un mensaje
            console.error(result.error);
            return;
        }
        // Actualizar el estado de los libros
        updateUserBooks();
        } catch (error) {
        console.error("Error al eliminar el libro:", error);
        }
    };

    return (
        <div className="user-books">
            {user && <Header user={user} />}
            <div className="user-books-container">
                <div className="content">
                    <h2 className="user-books-title">Tus libros</h2>
                    <div className="books-slider-container">
                    {userBooks.length > 0 ? (
                        userBooks.map((book) => <BookCard key={book.id} book={book} buttonText="Eliminar" onButtonClick={handleDeleteBook} />)
                    ) : (
                        <p className="no-books">No tienes libros en tu biblioteca.</p>
                    )}
                    </div>
                    <button className="add-books-button" onClick={() => navigate("/library")}>
                    Añadir más libros
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserBooks;