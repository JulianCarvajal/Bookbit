import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Header } from "../../components/Header";
import BookCard from "../../components/BookCard";
import "./Library.css";
import { Book } from "../../types/userTypes";
import { getAllBooks, addUserBook } from "../../services/bookService";

const Library: React.FC = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksData = await getAllBooks();
      setBooks(booksData);
    };

    fetchBooks();
  }, []);

  const handleAddBook = (book: Book) => {
    addUserBook(book.id);
  };

  return (
    // Library.tsx
    <div className="library-page">
        {user && <Header user={user} />}
        <div className="library-container">
            <div className="content">
                <h2 className="library-title">Conoce todos nuestros libros</h2>
                <div className="books-grid">
                    {books.length > 0 ? (
                        books.map((book) => (
                            <BookCard 
                                key={book.id} 
                                book={book} 
                                buttonText="Agregar" 
                                onButtonClick={handleAddBook} 
                            />
                        ))
                    ) : (
                        <p className="no-books">Nos hackearon wey, borraron todos los libros.</p>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Library;