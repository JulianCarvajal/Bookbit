import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserHome.css";
import { Header } from "../../components/Header";
import UserSection from "../../components/UserSection";
import UserDashboard from "../../components/UserDashboard";
import { AuthContext } from '../../context/AuthContext';

export default function UserHome() {
    const authContext = useContext(AuthContext);
    const user = authContext?.user;

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
                    <UserSection 
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
                        manageUrl="/userbooks" 
                    />
                </div>
            </main>
        </div>
    );
}
