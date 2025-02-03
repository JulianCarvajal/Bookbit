import React from "react";
import "./UserDashboard.css";
import { User, Item } from "../types/userTypes";

interface Props {
  user: User;
  avatars: Item[];
  currentAvatar: Item | undefined;
  onChangeAvatar: (avatar: Item) => void; 
}

export default function UserDashboard({ user, avatars, currentAvatar, onChangeAvatar }: Props) {

  return (
      <section className="user-dashboard">
        {/* Avatar y Mascota */}
        <div className="avatar-container">
          <img 
            src={user.currentAvatar || "https://e7.pngegg.com/pngimages/804/102/png-clipart-computer-icons-ghost-icon-fictional-character-black.png"} 
            alt="Avatar" 
            className="avatar" 
          />
          {user.pet && <img src={user.pet} alt="Mascota" className="pet" />}
        </div>

        {/* Botón para cambiar avatar */}
        <button className="change-avatar-button">Cambiar Avatar</button>
            
        {/* Lista de Avatares */}
        <div className="avatar-selection">
          {avatars.map(avatar => (
            <div 
              key={avatar.id} 
              className="avatar-option" 
              onClick={() => onChangeAvatar(avatar)}
            >
              <img src={avatar.image} alt={avatar.name} className="avatar-thumbnail" />
              <span>{avatar.name}</span>
            </div>
          ))}
        </div>
  
        {/* Inventario */}
        <div className="inventory-grid">
          {user.inventory && user.inventory.map((item) => (
            <div key={item.id} className="inventory-slot">
              <img src={item.image} alt={item.name} className="inventory-item" />
              <span className="item-tooltip">{item.name}</span>
            </div>
          ))}
        </div>
      </section>
  );
}