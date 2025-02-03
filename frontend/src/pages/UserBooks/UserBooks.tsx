import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import BookCard from "../../components/BookCard";
import "./UserBooks.css";
import { Book } from "../../types/userTypes";
import { deleteUserBook } from "../../services/bookService";

const UserBooks: React.FC = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const navigate = useNavigate();
  const userBooks = authContext?.user?.books || [];

  const handleDeleteBook = (book: Book) => {
      // Lógica para eliminar un libro
      deleteUserBook(book.id);
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