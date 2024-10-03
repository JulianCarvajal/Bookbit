import React, { useState, useEffect } from 'react';
import './BookList.css';

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
                <button className="delete-button">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="add-book-button">Añadir libro</button>
    </div>
  );
};

export default BooksList;