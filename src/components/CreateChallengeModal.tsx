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
        <form onSubmit={handleSubmit} className="modal-form">
          <label htmlFor="title">Nombre del reto</label>
          <input
            id="title"
            type="text"
            placeholder="Ej: Reto de 30 días"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label htmlFor="book">Selecciona un libro</label>
          <select
            id="book"
            value={bookId} 
            onChange={(e) => setBookId(Number(e.target.value))} 
            required
          >
            <option value="" disabled>
              Selecciona un libro
            </option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.name}
              </option>
            ))}
          </select>

          <label htmlFor="pages">Páginas</label>
          <input
            id="pages"
            type="number"
            placeholder="Total de páginas a leer en el reto. Ej: 300"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            required
          />

          <label htmlFor="deadline">Días para cumplir el reto</label>
          <input
            id="deadline"
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