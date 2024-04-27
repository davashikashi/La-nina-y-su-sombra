import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    //  lógica para validar el usuario o redirigir
    console.log('Usuario:', username);
    console.log('Contraseña:', password);
    alert(`Bienvenido, ${username}!`);
  };

  return (
    <div className="login-container">
      <h1>
        LA NIÑA Y SU SOMBRA
        </h1>
      <div className="login-form">
        <label htmlFor="username">Usuario:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button onClick={handleLogin}>Iniciar sesión</button>
      </div>
    </div>
  );
};

export default Login;
