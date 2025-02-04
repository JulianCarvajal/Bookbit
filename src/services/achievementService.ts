const API_URL = "https://bookbitback-production.up.railway.app";

// Función para obtener el token del usuario logueado
const getAuthToken = () => {
  return localStorage.getItem("auth-token") || "";
};

// Obtener los logros del usuario
export const getUserAchievements = async () => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}/user-achievements`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};