import React from "react";
import "./StoreItemCard.css";
import { Item } from "../types/userTypes";

interface StoreItemProps {
  item: Item;
  onBuy: (itemId: number) => void;
}

const StoreItemCard: React.FC<StoreItemProps> = ({ item, onBuy }) => {

  return (
    <div className="store-item-card">
      <h3 className="store-item-title">{item.name}</h3>
      <div className="store-item-image-container">
        <img src={item.image} alt={item.name} className="store-item-image" />
      </div>
      {/* <p className="store-item-category"><strong>Categoría:</strong> {item.category.name}</p> */}
      <p className="store-item-price"><strong>Precio:</strong> ${item.value} monedas</p>
      <button className="store-item-button" onClick={() => onBuy(item.id)}>Comprar</button>
    </div>
  );
};

export default StoreItemCard;