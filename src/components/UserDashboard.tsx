import React from "react";
import "./UserDashboard.css";
import { User, Item } from "../types/userTypes";
import SelectAvatarModal from "./SelectAvatarModal";

interface Props {
  user: User;
  avatars: Item[];
  currentAvatar: string;
  pets: Item[];
  currentPet: string;
  userItems: Item[];
  onChangeAvatar: (avatar: Item) => void;
  onChangePet: (pet: Item) => void;
}

export default function UserDashboard({ user, avatars, currentAvatar, pets, currentPet, userItems, onChangeAvatar, onChangePet }: Props) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isPetModalOpen, setIsPetModalOpen] = React.useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectAvatar = (avatar: Item) => {
    onChangeAvatar(avatar);
    setIsModalOpen(false);
  };

  const handleSelectPet = (pet: Item) => {
    onChangePet(pet);
    setIsPetModalOpen(false);
  }

  return (
      <section className="user-dashboard">
        {/* Avatar y Mascota */}
        <div className="avatar-container">
          <img 
            src={currentAvatar || "https://e7.pngegg.com/pngimages/804/102/png-clipart-computer-icons-ghost-icon-fictional-character-black.png"} 
            alt="Avatar" 
            className="avatar" 
          />
          {currentPet && <img src={currentPet} alt="Mascota" className="pet" />}
        </div>

        {/* Inventario */}
        <div className="inventory-grid">
          {userItems && userItems.map((item) => (
            <div key={item.id} className="inventory-slot">
              <img src={item.image} alt={item.name} className="inventory-item" />
              <span className="item-tooltip">{item.name}</span>
            </div>
          ))}
        </div>

        {/* Button container */}
        <div className="button-container">
          {/* Botón para cambiar avatar */}
          <button className="manage-button" onClick={handleOpenModal}>
            Cambiar avatar
          </button>

          {/* Botón para cambiar de mascota */}
          <button className="manage-button" onClick={() => setIsPetModalOpen(true)}>
            Cambiar mascota
          </button>
        </div>

        {isModalOpen && (
        <SelectAvatarModal 
          avatars={avatars}
          currentAvatar={avatars.find((avatar) => avatar.image === user.currentAvatar) || avatars[0]}
          onClose={handleCloseModal} 
          onSelect={handleSelectAvatar} 
        />)}

        {isPetModalOpen && (
        <SelectAvatarModal 
          avatars={pets}
          currentAvatar={pets.find((pet) => pet.image === user.pet) || pets[0]}
          onClose={() => setIsPetModalOpen(false)} 
          onSelect={handleSelectPet}
        />)}
        
      </section>
  );
}