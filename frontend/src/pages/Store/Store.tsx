import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Header } from "../../components/Header";
import StoreItemCard from "../../components/StoreItemCard";
import "./Store.css";
import { Item } from "../../types/userTypes";
import { getItems} from "../../services/itemsService";

const Store: React.FC = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const itemsData = await getItems();
      setItems(itemsData);
    };

    fetchItems();
  }, []);

  const handleBuy = (itemId: number) => {
    console.log("Comprando item con id", itemId);
  };

  return (
    <div className="library-page">
        {user && <Header user={user} />}
        <div className="library-container">
            <div className="content">
                <h2 className="library-title">Compra cositas lindas</h2>
                <div className="items-grid">
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
            </div>
        </div>
    </div>
  );
};

export default Store;