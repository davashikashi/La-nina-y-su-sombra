import React, { useState } from 'react';
import './Login.css';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();

  const handleLogin = async () => {
    //  lógica para validar el usuario o redirigir
    // console.log('Usuario:', username);
    // console.log('Contraseña:', password);
    // alert(`Bienvenido, ${username}!`);
    // window.location.href = '/level1';
    await auth.loginWithinGoogle().then((res) => {
      window.location.href = '/level1';
    }).catch((error) => {
       console.error('Error:', error)
      });
  };

  return (
    <div className="login-container">
      <h1>
        LA NIÑA Y SU SOMBRA
        </h1>
        
        <button onClick={handleLogin}>Iniciar sesión</button>
      </div>
  );
};

export default Login;
