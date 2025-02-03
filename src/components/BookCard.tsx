import React from "react";
import "./BookCard.css";
import { Book } from "../types/userTypes";

interface BookCardProps {
    book: Book;
    buttonText?: string;
    onButtonClick?: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ( {book, buttonText, onButtonClick} ) => {
  return (
    <div className="book-card">
      <h3 className="book-title">{book.name}</h3>
      <div className="book-info">
        <p><strong>Autor:</strong> {book.author}</p>
        <p><strong>Páginas:</strong> {book.pages}</p>
        {book.chapters && <p><strong>Capítulos:</strong> {book.chapters}</p>}
        <p><strong>Fecha de publicación:</strong> {book.publication_date}</p>
      </div>
      {buttonText && onButtonClick && (
        <button className="book-action-button" onClick={() => onButtonClick(book)}>
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default BookCard;