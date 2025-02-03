const API_URL = "https://bookbitback-production.up.railway.app";

const getAuthToken = () => {
    return localStorage.getItem("auth-token") || "";
};

// Obtiene los items de la tienda
export const getItems = async () => {
    try {
        const response = await fetch(`${API_URL}/item`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        });

        if (!response.ok) throw new Error("Error al obtener los items de la tienda");

        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Compra un item
export const buyItem = async (itemId: number) => {
    try {
        const token = getAuthToken();
        if (!token) throw new Error("Usuario no autenticado");

        const response = await fetch(`${API_URL}/inventory/buy/${itemId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
        });

        if (!response.ok) throw new Error("Error al comprar el item");

        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};