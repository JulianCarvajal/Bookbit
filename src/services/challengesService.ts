import { Book } from "../types/userTypes";

const API_URL = "https://bookbitback-production.up.railway.app";

// Función para obtener el token del usuario logueado
const getAuthToken = () => {
  return localStorage.getItem("auth-token") || "";
};

// Obtiene los retos del usuario logueado.
export const getUserChallenges = async () => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Usuario no autenticado");

    const response = await fetch(`${API_URL}/challenges`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error("Error al obtener los libros del usuario");

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Permite que el usuario agregue un reto
export const addChallenges = async ( name: string, book: Book, pages: number, deathLine: number) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Usuario no autenticado");

    const response = await fetch(`${API_URL}/challenges`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, book, pages, deathLine })
    });

    if (!response.ok) throw new Error("Error al agregar el libro");

    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: "No se pudo agregar el libro" };
  }
};

// Permite que el usuario elimine un libro de su biblioteca personal.
export const deleteUserChallenge = async (challengeId: number) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Usuario no autenticado");

    const response = await fetch(`${API_URL}/challenges/${challengeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Status:', response.status);
    console.log('Response:', response);

    if (!response.ok) throw new Error("Error al eliminar el libro");

    if (response.status !== 204) {
      return await response.json();
    }
    
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "No se pudo eliminar el libro" };
  }
};

// Marcar un reto como completado
export const completeChallenge = async (challengeId: number) => {
    try {
        const token = getAuthToken();
        if (!token) throw new Error("Usuario no autenticado");
    
        const response = await fetch(`${API_URL}/challenges/${challengeId}/complete`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
        });
    
        if (!response.ok) throw new Error("Error al completar el reto");
    
        return await response.json();
    } catch (error) {
        console.error(error);
        return { error: "No se pudo completar el reto" };
    }
};