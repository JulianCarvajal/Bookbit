import React, { useState } from "react";
import "./CreateChallengeModal.css";
import { Book } from "../types/userTypes";

interface CreateChallengeModalProps {
  books: Book[];
  onClose: () => void;
  onCreate: (challengeData: {
    title: string;
    book: Book;
    pages: number;
    deathLine: number;
  }) => void;
}

const CreateChallengeModal: React.FC<CreateChallengeModalProps> = ({ books, onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [bookId, setBookId] = useState<number | "">("");
  const [pages, setPages] = useState("");
  const [deathLine, setDeathLine] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !bookId || !pages || !deathLine) return;
  
    const selectedBook = books.find(book => book.id === Number(bookId));
    if (!selectedBook) return;
  
    onCreate({
      title,
      book: selectedBook,  // Pasamos el objeto Book completo
      pages: Number(pages),
      deathLine: Number(deathLine),
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Crea tu próximo reto</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre del reto"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <select value={bookId} onChange={(e) => setBookId(Number(e.target.value))} required>
            <option value="" disabled>
              Selecciona un libro
            </option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Número de páginas diarias que quieres leer"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Cantidad de días para cumplir el reto"
            value={deathLine}
            onChange={(e) => setDeathLine(e.target.value)}
            required
          />
          <div className="modal-buttons">
            <button type="submit" className="create-button">
              Crear reto
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChallengeModal;