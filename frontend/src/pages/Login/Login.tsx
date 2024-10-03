import React from 'react';
import './Login.css';
import AuthForm from '../../components/AuthForm';

export default function Login() {
    return(
    <AuthForm
      title="Inicia sesión"
      message="Accede con tu cuenta de Google para continuar"
      buttonText="Iniciar sesión con Google"
      linkText="Regístrate"
      linkPath="/register"
      linkDescription="¿No tienes cuenta?"
    />
    );
};