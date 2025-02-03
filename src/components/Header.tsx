import React from "react";
import { BsCoin } from "react-icons/bs";
import "./Header.css";

interface HeaderProps {
  user: {
    name: string;
    image: string;
    coins: number;
  };
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="header">
      {/* Sección de información del usuario */}
      <div className="user-info">
        <img 
          src={user.image || "/placeholder.svg"} 
          alt={`Foto de perfil de ${user.name}`} 
          className="user-avatar" 
        />
        <h1 className="user-name">{user.name}</h1>
      </div>

      {/* Barra de navegación */}
      <div className="navbar">
        <a href="/userhome" className="nav-link">Inicio</a>
        <a href="/userbooks" className="nav-link">Mis libros</a>
        <a href="/userchallenges" className="nav-link">Mis retos</a>
        <a href="/store" className="nav-link">Tienda</a>
        <a href="/library" className="nav-link">Biblioteca</a>
      </div>

      {/* Sección de monedas */}
      <div className="user-coins">
        <BsCoin className="coin-icon" size={24} />
        <span>{user.coins}</span>
      </div>
    </header>
  );
};