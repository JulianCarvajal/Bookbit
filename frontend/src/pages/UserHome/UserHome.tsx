import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserHome.css";
import { Header } from "../../components/Header";
import UserSection from "../../components/UserSection";
import UserDashboard from "../../components/UserDashboard";
import { User } from "../../types/userTypes";
import { AuthContext } from '../../context/AuthContext';

export default function UserHome() {
    const [user, setUser] = useState<User | null>(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        setUser(authContext?.user || null);
    }, []);

    if (!user) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="user-home">
            <Header user={user} />
            <main className="user-main">
                {/* Sección izquierda - Centro de Mando */}
                <UserDashboard user={user} />
                
                {/* Sección derecha - Retos y Librería */}
                <div className="user-content">
                    {/* <UserSection 
                        title="Tus Retos" 
                        items={user.challenges?.map(challenge => ({
                            title: challenge.title,
                            attribute1: "Libro",
                            value1: "Por definir",
                            attribute2: "Estado",
                            value2: "Por definir",
                        })) || []} 
                        manageUrl="/manage-challenges" 
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
                        manageUrl="/manage-library" 
                    /> */}
                </div>
            </main>
            <p>Bienvenido {authContext?.user?.name}</p>
        </div>
    );
}
