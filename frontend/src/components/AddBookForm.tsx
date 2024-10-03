import React, { useState } from 'react';
import './AddBookForm.css';

interface Book {
  id: number;
  name: string;
  author: string;
  pages: number;
  chapters: number;
  publicationDate: string;
}

interface AddBookFormProps {
  onClose: () => void;
  onAddBook: (book: Book) => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onClose, onAddBook }) => {
  const [newBook, setNewBook] = useState<Book>({
    id: 0,
    name: '',
    author: '',
    pages: 0,
    chapters: 0,
    publicationDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: name === 'chapters' ? (value ? parseInt(value) : undefined) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBook(newBook);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="add-book-form">
        <h2>Añadir Nuevo Libro</h2>
        <form onSubmit={handleSubmit}>
          <input type="number" name="id" placeholder="ID" required onChange={handleChange} />
          <input type="text" name="name" placeholder="Nombre" required onChange={handleChange} />
          <input type="text" name="author" placeholder="Autor" required onChange={handleChange} />
          <input type="number" name="pages" placeholder="Páginas" required onChange={handleChange} />
          <input type="number" name="chapters" placeholder="Capítulos" onChange={handleChange} />
          <input type="text" name="publicationDate" placeholder="Fecha de publicación dd-mm-aaaa" required onChange={handleChange} />
          <button type="submit">Añadir Libro</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
