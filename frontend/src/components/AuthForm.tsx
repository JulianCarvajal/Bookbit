import React from 'react';
import { Link } from 'react-router-dom';
import './AuthForm.css';

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
  return (
    <div className="auth-form-container">
      <div className="auth-form">
        <h1>{title}</h1>
        <p>{message}</p>
        <button className="google-auth-button">{buttonText}</button>
        <p>
          {linkDescription} <Link to={linkPath}>{linkText}</Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;