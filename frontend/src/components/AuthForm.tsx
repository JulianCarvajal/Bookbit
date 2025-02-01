import React from 'react';
import { Link } from 'react-router-dom';
import './AuthForm.css';
import GoogleLoginButton from './GoogleLoginButton';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
  title: string;
  message: string;
  buttonText: string;
  linkText: string;
  linkPath: string;
  linkDescription: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  message,
  buttonText,
  linkText,
  linkPath,
  linkDescription,
}) => {

  const navigate = useNavigate();

  const handleLoginSuccess = (token: string) => {
    console.log("Login exitoso, token recibido:", token);
    // Aquí podrías guardar el token, redirigir al usuario o hacer una petición al backend
    localStorage.setItem("user", token); // Ejemplo de cómo almacenar el token

    // Redirigir al home del usuario. Debería hacerse automáticamente
    navigate('/userhome');
    // window.location.href = '/home'; // O usar React Router para redirigir
  };

  // Función que se ejecuta cuando el login falla
  const handleLoginFailure = () => {
    console.log("Error en el login");
    // Puedes mostrar un mensaje de error o manejar el flujo de error
  };
  return (
    <div className="auth-form-container">
      <div className="auth-form">
        <h1>{title}</h1>
        <p>{message}</p>
        <GoogleLoginButton 
          onLoginSuccess={handleLoginSuccess} // Llamar a handleLoginSuccess en caso de éxito
          onLoginFailure={handleLoginFailure} // Llamar a handleLoginFailure en caso de error
        />
        <p>
          {linkDescription} <Link to={linkPath}>{linkText}</Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;