import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import BookList from "./pages/BookList/BookList";
import UserHome from './pages/UserHome/UserHome';

function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Rutas protegidas */}
      <Route path="/books" element={<BookList />} />
      <Route path="/userhome" element={<UserHome />} />

      {/* Ruta para manejar URLs no encontradas */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;