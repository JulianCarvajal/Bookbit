import React from 'react';
import AuthForm from '../../components/AuthForm';

export default function Register() {
  return (
    <AuthForm
      title="Crea tu cuenta ahora!"
      message="¡Únete a nosotros y lleva tus hábitos de lectura al siguiente nivel!"
      buttonText="Crear cuenta con Google"
      linkText="Inicia sesión"
      linkPath="/login"
      linkDescription="¿Ya tienes una cuenta?"
    />
  );
}