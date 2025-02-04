import React, { useContext } from "react";
import { BsCoin } from "react-icons/bs";
import "./Header.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  user: {
    name: string;
    image: string;
    coins: number;
  };
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    authContext?.logout();
    navigate("/");
  };

  return (
    <header className="header">
      {/* Sección de información del usuario */}
      <div className="user-info">
        <img 
          src={user.image || "/placeholder.svg"} 
          alt={`Foto de perfil de ${user.name}`} 
          className="user-avatar" 
        />
        <div className="user-details">
          <h1 className="user-name">{user.name}</h1>
          <div className="user-coins">
            <BsCoin className="coin-icon" size={20} />
            <span>{user.coins}</span>
          </div>
        </div>
      </div>

      {/* Barra de navegación */}
      <div className="navbar">
        <a href="/userhome" className="nav-link">Inicio</a>
        <a href="/userbooks" className="nav-link">Mis libros</a>
        <a href="/userchallenges" className="nav-link">Mis retos</a>
        <a href="/store" className="nav-link">Tienda</a>
        <a href="/library" className="nav-link">Biblioteca</a>
      </div>

      {/* Botón de cerrar sesión */}
      <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
    </header>
  );
};