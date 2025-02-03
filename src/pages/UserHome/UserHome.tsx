import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserHome.css";
import { Header } from "../../components/Header";
import UserSection from "../../components/UserSection";
import UserDashboard from "../../components/UserDashboard";
import { getUserChallenges } from "../../services/challengesService";
import { getUserItems, modifyAvatar } from "../../services/userService";
import { AuthContext } from '../../context/AuthContext';
import { Challenge, Item, User } from "../../types/userTypes";

export default function UserHome() {
    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [avatars, setAvatars] = useState<Item[]>([]);
    const [currentAvatar, setCurrentAvatar] = useState<Item>();

    useEffect(() => {
        updateChallenges();
        updateAvatars();
    }, []);

    const updateChallenges = async () => {
        try {
            const challengeData = await getUserChallenges();
            setChallenges(challengeData);
        } catch (error) {
            console.error("Error fetching challenges:", error);
        }
    };

    const updateAvatars = async () => {
        try {
            const items = await getUserItems();
            const avatars: Item[] = items.filter((item: Item) => item.category.name === "avatar");
            setAvatars(avatars);
        } catch (error) {
            console.error("Error fetching avatars:", error);
        }
    };

    const handleChangeAvatar = async (avatar: Item) => {
        try {
            await modifyAvatar(avatar.id);
            setCurrentAvatar(avatar);
        } catch (error) {
            console.error("Error changing avatar:", error);
        }
    };

    if (!user) {
        return <div>Cargando...</div>;
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
                    onChangeAvatar={handleChangeAvatar} 
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
                        items={user.books?.map(book => ({
                            title: book.name,
                            attribute1: "Autor",
                            value1: book.author,
                            attribute2: "Editorial",
                            value2: book.editorial,
                        }))} 
                        manageUrl="/userbooks" 
                    />
                </div>
            </main>
        </div>
    );
}
