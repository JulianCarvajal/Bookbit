import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Button from "../../components/Button";

export default function Home() {
  return (
    <div className="home">
    <header className="header">
      <img src="/assets/logo.png" alt="Logo" className="logo" />
      <nav>
        <ul>
          <li><a href="#about">Acerca de</a></li>
          <li><a href="#features">Características</a></li>
          <li><a href="#contact">Profe ponganos 5</a></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        <Link to="/login"><button>Iniciar Sesión</button></Link>
        <Link to="/register"><button>Registrarse</button></Link>
      </div>
    </header>
    <main className="main-content">
      <h1>Bookbit</h1>
      <h2>Tu aliado en la lectura</h2>
      <div className="auth-buttons">
        <Link to="/login"><button>Iniciar Sesión</button></Link>
        <Link to="/register"><button>Registrarse</button></Link>
      </div>
    </main>
    <footer className="footer">
      <p>Datos de contacto y derechos</p>
    </footer>

    </div>
  );
};