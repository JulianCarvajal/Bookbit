import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Header } from "../../components/Header";
import StoreItemCard from "../../components/StoreItemCard";
import "./Store.css";
import { useNavigate } from "react-router-dom";
import { Item } from "../../types/userTypes";
import { getItems, buyItem } from "../../services/itemsService";

const Store: React.FC = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const itemsData = await getItems();
      setItems(itemsData);
    };

    fetchItems();
  }, []);

  // Maneja la compra de un item
  const handleBuy = async (itemId: number) => {
    try {
      await buyItem(itemId);
      const itemsData = await getItems();
      setItems(itemsData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="store-page">
        {user && <Header user={user} />}
        <div className="store-container">
            <div className="content">
                <h2 className="store-title">Compra cositas lindas</h2>
                <div className="store-items-grid">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <StoreItemCard 
                                key={item.id} 
                                item={item}
                                onBuy={handleBuy} 
                            />
                        ))
                    ) : (
                        <p className="no-items">Otra vez se cayó producción :c</p>
                    )}
                </div>
                <button 
                        className="go-home-button" 
                        onClick={() => navigate("/userhome")}
                    >
                        Ir al perfil
                    </button>
            </div>
        </div>
    </div>
  );
};

export default Store;