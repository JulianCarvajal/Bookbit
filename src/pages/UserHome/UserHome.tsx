import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserHome.css";
import { Header } from "../../components/Header";
import UserSection from "../../components/UserSection";
import UserDashboard from "../../components/UserDashboard";
import { getUserChallenges } from "../../services/challengesService";
import { getUserItems, modifyAvatar, modifyPet } from "../../services/userService";
import { AuthContext } from '../../context/AuthContext';
import { Challenge, Item, User, ItemXUsuario, BookXUser } from "../../types/userTypes";
import { getUserBooks } from "../../services/bookService";

export default function UserHome() {
    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [userBooks, setUserBooks] = useState<BookXUser[]>([]);
    const [avatars, setAvatars] = useState<Item[]>([]);
    const [pets, setPets] = useState<Item[]>([]);
    const [currentAvatar, setCurrentAvatar] = useState<string>("");
    const [currentPet, setCurrentPet] = useState<string>("");
    const [ userItems, setUserItems ] = useState<Item[]>([]);

    useEffect(() => {
        updateChallenges();
        updateUserBooks();
        updateAvatars();
        updatePets();
        updateUserItems();
    }, []);

    const updateChallenges = async () => {
        try {
            const challengeData = await getUserChallenges();
            setChallenges(challengeData);
        } catch (error) {
            console.error("Error fetching challenges:", error);
        }
    };

    const updateUserBooks = async () => {
        try {
            const booksData = await getUserBooks();
            setUserBooks(booksData);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const updateUserItems = async () => {
        try {
            const items = await getUserItems();
            const userItems = items.map((item: ItemXUsuario) => item.item);
            setUserItems(userItems);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const updateAvatars = async () => {
        try {
            const items = await getUserItems();
            
            // Extraer solo los objetos `item` cuyo category.name sea "avatar"
            const avatars: Item[] = items
                .filter((object: ItemXUsuario) => object.item.category.name === "avatar")
                .map((object: ItemXUsuario) => object.item); // Extraer solo la propiedad "item"
    
            setAvatars(avatars);

            // Obtener el avatar actual del usuario
            const currentAvatar = avatars.find((avatar: Item) => avatar.image === user?.currentAvatar);
            setCurrentAvatar(currentAvatar?.image || "");
        } catch (error) {
            console.error("Error fetching avatars:", error);
        }
    };

    const handleChangeAvatar = async (avatar: Item) => {
        try {
            await modifyAvatar(avatar.id);
            setCurrentAvatar(avatar.image);
        } catch (error) {
            console.error("Error changing avatar:", error);
        }
    };

    const updatePets = async () => {
        try {
            const items = await getUserItems();

            const pets: Item[] = items
                .filter((object: ItemXUsuario) => object.item.category.name === "mascota")
                .map((object: ItemXUsuario) => object.item);
    
            setPets(pets);

            // Obtener el avatar actual del usuario
            const currentPet = pets.find((pet: Item) => pet.image === user?.pet);
            setCurrentPet(currentPet?.image || "");
        } catch (error) {
            console.error("Error fetching pets:", error);
        }
    };

    const handleChangePet = async (pet: Item) => {
        try {
            await modifyPet(pet.id);
            setCurrentPet(pet.image);
        } catch (error) {
            console.error("Error changing pet:", error);
        }
    };

    if (!user) {
        return (
            <div className="user-home">
                {user && <Header user={user} />}
                <p>Cargando ...</p>
            </div>
        );
    }

    return (
        <div className="user-home">
            <Header user={user} />
            <main className="user-main">
                {/* Sección izquierda - Centro de Mando */}
                <UserDashboard 
                    user={user} 
                    avatars={avatars}
                    currentAvatar={currentAvatar}
                    pets={pets}
                    currentPet={currentPet}
                    userItems={userItems}
                    onChangeAvatar={handleChangeAvatar} 
                    onChangePet={handleChangePet}
                />
                
                {/* Sección derecha - Retos y Librería */}
                <div className="user-content">
                    <UserSection 
                        title="Tus Retos" 
                        items={challenges.map(challenge => ({
                            title: challenge.name,
                            attribute1: "Recompensa",
                            value1: challenge.reward.toString(),
                            attribute2: "Estado",
                            value2: challenge.state.name,
                        })) || []} 
                        manageUrl="/userchallenges" 
                    />
                    <UserSection 
                        title="Tu biblioteca" 
                        items={userBooks.map(userBook => ({
                            title: userBook.book.name,
                            attribute1: "Autor",
                            value1: userBook.book.author,
                            attribute2: "Editorial",
                            value2: userBook.book.editorial,
                        }))} 
                        manageUrl="/userbooks" 
                    />
                </div>
            </main>
        </div>
    );
}
