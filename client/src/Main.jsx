import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Access from './Access.jsx';

function Main() {
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [userData, setUserData] = useState({}); // Agregar estado para almacenar los datos del usuario

  // Función para manejar el inicio de sesión exitoso
  const handleLoginSuccess = (userData) => { // Recibir los datos del usuario desde Access
    setUserData(userData); // Almacena los datos del usuario
    setLoginSuccessful(true);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setUserData(null); // Limpiar datos del usuario al cerrar sesión
    setLoginSuccessful(false);
  };

  return (
    <>
      {loginSuccessful ? (
        <App onLogout={handleLogout} userData={userData} /> // Pasar userData al componente App
      ) : (
        <Access onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}

createRoot(document.getElementById('root')).render(<Main />);
