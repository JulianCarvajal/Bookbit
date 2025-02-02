import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './AuthForm.css';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

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
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleLoginSuccess = async (response: any) => {
    const googleToken = response.credential;

    try {
      const res = await fetch('https://bookbitback-production.up.railway.app/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: googleToken }),
      });

      if (!res.ok) throw new Error('Error en la autenticación');

      const { jwt } = await res.json();
      authContext?.login(jwt);
      navigate('/userhome');
    } catch (error) {
      console.error('Error al autenticar el usuario', error);
    }
  };

  const handleLoginFailure = () => {
    console.log('Login failed');
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form">
        <h1>{title}</h1>
        <p>{message}</p>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
        <p>
          {linkDescription} <Link to={linkPath}>{linkText}</Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;