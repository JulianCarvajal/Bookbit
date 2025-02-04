import React from "react";
import "./BookCard.css";
import { Book } from "../types/userTypes";

interface BookCardProps {
    book: Book;
    buttonText?: string;
    bookPercentage?: number;
    onButtonClick?: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ( {book, buttonText, bookPercentage, onButtonClick} ) => {
  return (
    <div className="book-card">
      <h3 className="book-title">{book.name}</h3>
      <div className="book-info">
        <p><strong>Autor:</strong> {book.author}</p>
        <p><strong>Páginas:</strong> {book.pages}</p>
        {book.chapters && <p><strong>Capítulos:</strong> {book.chapters}</p>}
        {bookPercentage !== null && bookPercentage !== undefined && (
          <p><strong>Porcentaje:</strong> {bookPercentage}%</p>
        )}
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