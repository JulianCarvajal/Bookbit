import React, { useState } from "react";
import "./SelectAvatarModal.css";
import { Item } from "../types/userTypes";

interface SelectAvatarModal {
  avatars: Item[];
  currentAvatar: Item;
  onSelect: (avatar: Item) => void;
  onClose: () => void;
}

const SelectAvatarModal: React.FC<SelectAvatarModal> = ({
  avatars,
  currentAvatar,
  onSelect,
  onClose,
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState<Item>(currentAvatar);

  const handleSelect = (avatar: Item) => {
    setSelectedAvatar(avatar);
  };

  const handleConfirm = () => {
    if (selectedAvatar !== null) {
      onSelect(selectedAvatar);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Selecciona tu avatar</h2>
        <div className="avatar-grid">
          {avatars.map((avatar) => (
            <div
              key={avatar.id}
              className={`avatar-slot ${selectedAvatar.id === avatar.id ? "selected" : ""}`}
              onClick={() => handleSelect(avatar)}
            >
              <img src={avatar.image} alt={avatar.name} className="avatar-image" />
            </div>
          ))}
        </div>
        <div className="modal-buttons">
          <button className="cancel-button" onClick={onClose}>Cancelar</button>
          <button className="confirm-button" onClick={handleConfirm} disabled={selectedAvatar === null}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectAvatarModal;
