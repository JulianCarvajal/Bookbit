import React, { useState, useEffect } from 'react';
import './BookList.css';
import AddBookForm from '../../components/AddBookForm';

interface Book {
  id: number;
  name: string;
  author: string;
  pages: number;
  chapters?: number;
  publicationDate: string;
}

const BooksList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAddingBook, setIsAddingBook] = useState<boolean>(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:4000/books', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Error fetching books');
        }
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError('Failed to load books');
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:4000/books/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Error deleting book');
        }
  
        // Update the state to remove the deleted book
        setBooks((prevBooks) => prevBooks.filter(book => book.id !== id));
      } catch (error) {
        setError('Failed to delete the book');
      }
  }

  const handleAddBook = async (newBook: Book) => {
    try {
      const response = await fetch('http://localhost:4000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });
      if (!response.ok) {
        throw new Error('Error adding book');
      }
      const addedBook = await response.json();
      setBooks((prev) => [...prev, addedBook]);
    } catch (err) {
      setError('Failed to add book');
    }
  };

  return (
    <div className="books-list-container">
      <h1>Nuestros libros disponibles, pronto tendremos más. También puedes añadir un libro si quieres :)</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <p><strong>Nombre:</strong> {book.name}</p>
              <p><strong>Autor:</strong> {book.author}</p>
              <p><strong>Páginas:</strong> {book.pages}</p>
              {book.chapters && <p><strong>Capítulos:</strong> {book.chapters}</p>}
              <p><strong>Fecha de Publicación:</strong> {book.publicationDate}</p>
              <div className="book-actions">
                <button className="modify-button">Modificar</button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(book.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="add-book-button" onClick={() => setIsAddingBook(true)}>Añadir libro</button>
      {isAddingBook && (
        <AddBookForm onClose={() => setIsAddingBook(false)} onAddBook={handleAddBook} />
      )}
    </div>
  );
};

export default BooksList;