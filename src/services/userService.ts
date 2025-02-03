const API_URL = "https://bookbitback-production.up.railway.app";

// Función para obtener el token del usuario logueado
const getAuthToken = () => {
  return localStorage.getItem("auth-token") || "";
};

// Obtiene todos los items del usuario
export const getUserItems = async () => {
    try {
        const token = getAuthToken();
        if (!token) throw new Error("Usuario no autenticado");
    
        const response = await fetch(`${API_URL}/inventory`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
        });
    
        if (!response.ok) throw new Error("Error al obtener los items del usuario");
    
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Servicio para modificar el avatar del usuario
export const modifyAvatar = async (avatarId: number) => {
    try {
        const token = getAuthToken();
        if (!token) throw new Error("Usuario no autenticado");
    
        const response = await fetch(`${API_URL}/user/${avatarId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
        });
    
        if (!response.ok) throw new Error("Error al modificar el avatar");
    
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};