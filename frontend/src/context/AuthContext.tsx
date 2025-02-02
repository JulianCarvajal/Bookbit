import React, { createContext, useState, useEffect } from 'react';
import { User } from '../types/userTypes';

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('auth-token', token);
    fetchUserData(token);
  };

  const fetchUserData = async (token: string) => {
    try {
      const res = await fetch('https://bookbitback-production.up.railway.app/auth/me', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        console.error('Token inválido, cerrando sesión...');
        logout(); // Si el token es inválido, cerrar sesión
        return;
      }

      const data = await res.json();
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      console.error('Error obteniendo datos del usuario:', error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};