import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  // Agrega más propiedades según lo que retorne el JSON
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Estado para almacenar los usuarios
  const [loading, setLoading] = useState<boolean>(true); // Para mostrar un mensaje de carga
  const [error, setError] = useState<string | null>(null); // Para manejar errores

  useEffect(() => {
    // Función para hacer la solicitud al backend
    const fetchUsers = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/users');
        if (!response.ok) {
          throw new Error('Error al obtener los usuarios');
        }
        const data = await response.json();
        setUsers(data); // Guardar la respuesta en el estado
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false); // Quitar el mensaje de carga
      }
    };

    fetchUsers();
  }, []);

  // Mostrar el estado de carga, errores o la lista de usuarios
  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;