import React from "react";
import "./UserDashboard.css";
import { User } from "../types/userTypes";

interface Props {
    user: User;
}

export default function UserDashboard({ user }: Props) {
    return (
        <section className="user-dashboard">
          {/* Avatar y Mascota */}
          <div className="avatar-container">
            <img src={user.avatar || "https://e7.pngegg.com/pngimages/804/102/png-clipart-computer-icons-ghost-icon-fictional-character-black.png"} alt="Avatar" className="avatar" />
            {user.pet && <img src={user.pet} alt="Mascota" className="pet" />}
          </div>
    
          {/* Inventario */}
          <div className="inventory-grid">
            {user.inventory.map((item) => (
              <div key={item.id} className="inventory-slot">
                <img src={item.image} alt={item.name} className="inventory-item" />
                <span className="item-tooltip">{item.name}</span>
              </div>
            ))}
          </div>
        </section>
    );
}