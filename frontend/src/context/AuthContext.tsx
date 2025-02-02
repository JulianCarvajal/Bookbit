import React, { createContext, useContext, useState, useCallback } from 'react';
import { AuthState, User } from '../types/userTypes';

interface AuthContextType extends AuthState {
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('auth_token'),
    isAuthenticated: false,
    isLoading: false
  });

  const login = useCallback(async (token: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // Guardar token
      localStorage.setItem('auth_token', token);
      
      // Decodificar token o hacer una llamada al backend para obtener datos del usuario
      const userResponse = await fetch('https://bookbitback-production.up.railway.app/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!userResponse.ok) throw new Error('Failed to get user data');
      
      const userData: User = await userResponse.json();
      
      setAuthState({
        user: userData,
        token,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      console.error('Auth error:', error);
      localStorage.removeItem('auth_token');
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false
      });
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};