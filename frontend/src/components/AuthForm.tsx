import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import './AuthForm.css';
import GoogleLoginButton from './GoogleLoginButton';
import { useAuth } from '../context/AuthContext';

interface AuthFormProps {
  title: string;
  message: string;
  linkText: string;
  linkPath: string;
  linkDescription: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  message,
  linkText,
  linkPath,
  linkDescription,
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Redireccionar si ya está autenticado
  if (isAuthenticated) {
    return <Navigate to="/userhome" replace />;
  }

  return (
    <div className="auth-form-container">
      <div className="auth-form">
        <h1>{title}</h1>
        <p>{message}</p>
        {isLoading ? (
          <div>Cargando...</div>
        ) : (
          <GoogleLoginButton />
        )}
        <p>
          {linkDescription} <Link to={linkPath}>{linkText}</Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;