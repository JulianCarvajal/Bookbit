const API_URL = "https://bookbitback-production.up.railway.app";

// Función para obtener el token del usuario logueado
const getAuthToken = () => {
  return localStorage.getItem("auth-token") || "";
};

// Obtiene los libros de la biblioteca del usuario logueado.
export const getUserBooks = async () => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Usuario no autenticado");

    const response = await fetch(`${API_URL}/user-books`, {
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

// Obtiene todos los libros de la biblioteca general.

export const getAllBooks = async () => {
  try {
      const response = await fetch(`${API_URL}/books`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }
      });

      if (!response.ok) throw new Error("Error al obtener la biblioteca general");

      return await response.json();
  } catch (error) {
      console.error(error);
      return [];
  }
};

// Permite que el usuario agregue un libro de la biblioteca general a su biblioteca personal.
export const addUserBook = async (bookId: number) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Usuario no autenticado");

    const response = await fetch(`${API_URL}/user-books/${bookId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ bookId })
    });

    if (!response.ok) throw new Error("Error al agregar el libro");

    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: "No se pudo agregar el libro" };
  }
};

// Permite que el usuario elimine un libro de su biblioteca personal.
export const deleteUserBook = async (bookId: number) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Usuario no autenticado");

    const response = await fetch(`${API_URL}/user-books/${bookId}`, {
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
