import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

interface GoogleLoginButtonProps {
  onLoginSuccess: (token: string) => void;
  onLoginFailure: () => void;  // Cambié el tipo aquí a una función sin parámetros
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onLoginSuccess, onLoginFailure }) => {

  const handleLoginSuccess = (response: any) => {
    // El token recibido de Google es un string
    const token = response.credential;
    if (token) {
      // Enviar token al backend para verificar si el usuario está registrado
      fetch('/api/auth/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
      .then((res) => res.json())
      .then((data) => {
        onLoginSuccess(data.token);  // Manejar la respuesta del backend (guardar token de sesión, etc.)
      })
      .catch((error) => {
        console.error('Error al autenticar el usuario', error);
        onLoginFailure(); // Llamar al callback de error
      });
    }
  };

  const handleLoginFailure = () => {
    // Puedes manejar el error aquí si lo necesitas
    console.log('Login failed');
    onLoginFailure();  // Llamar sin parámetros
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleLoginSuccess}  // Llamar cuando la autenticación es exitosa
        onError={handleLoginFailure}    // Llamar cuando ocurre un error
      />
    </div>
  );
};

export default GoogleLoginButton;
