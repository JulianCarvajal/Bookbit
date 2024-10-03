import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  birth_date: string;
  email: string;
  id_status: number;
  coins: number;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Hacer solicitud al backend
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/users', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Verificar si la respuesta es OK
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        // Intentar parsear la respuesta como JSON
        const data = await response.json();
        
        // Verificar si lo que se recibió es un array
        if (!Array.isArray(data)) {
          throw new Error('Respuesta inesperada, no es un array de usuarios.');
        }

        setUsers(data); // Guardar la respuesta en el estado
      } catch (error: any) {
        setError(error.message || 'Error al obtener los datos');
      } finally {
        setLoading(false); // Quitar el estado de carga
      }
    };

    fetchUsers();
  }, []);

  // Mostrar el estado de carga
  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  // Mostrar el error
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.birth_date} - {user.coins} monedas
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;