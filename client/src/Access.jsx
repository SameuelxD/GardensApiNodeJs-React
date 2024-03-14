import React, { useState } from 'react';
import './Access.css';
import SingUp from '../components/SingUp/SingUp';
import SingIn from '../components/SingIn/SingIn';

function Access({ onLoginSuccess }) {
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [userData, setUserData] = useState(null);

    const handleSwitchToSignUp = () => {
        setIsSigningUp(true);
    }

    const handleSwitchToSignIn = () => {
        setIsSigningUp(false);
    }

    const handleLoginSuccess = (userData) => {
        setUserData(userData); // Almacena los datos del usuario
        onLoginSuccess(userData); // Envía los datos del usuario al componente padre (Main)
    }

    return (
        <div className="container-access">
            {isSigningUp ? (
                <SingUp onLoginSuccess={handleLoginSuccess} />
            ) : (
                <SingIn onLoginSuccess={handleLoginSuccess} />
            )}
            {/* Botón para alternar entre SignUp y SignIn */}
            <button onClick={isSigningUp ? handleSwitchToSignIn : handleSwitchToSignUp}>
                {isSigningUp ? "Sign In" : "Sign Up"}
            </button>
        </div>
    );
}

export default Access;
