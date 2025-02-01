import React from 'react';
import './App.css';
import { Routes, Route} from 'react-router-dom';
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import BookList from "./pages/BookList/BookList";
import UserHome from './pages/UserHome/UserHome';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/userhome" element={<UserHome />} />
      </Routes>
    </>
  );
}

export default App;