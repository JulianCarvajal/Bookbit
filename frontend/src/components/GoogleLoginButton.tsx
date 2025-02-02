import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { AuthService } from '../services/auth.service';
import { useAuth } from '../context/AuthContext';

const GoogleLoginButton: React.FC = () => {
  const { login } = useAuth();

  const handleLoginSuccess = async (response: any) => {
    try {
      // Token de Google
      const googleToken = response.credential;
      
      // Enviar a nuestro backend
      const { token: authToken } = await AuthService.googleLogin(googleToken);
      
      // Guardar nuestro JWT
      await login(authToken);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={() => console.error('Login Failed')}
    />
  );
};

export default GoogleLoginButton;