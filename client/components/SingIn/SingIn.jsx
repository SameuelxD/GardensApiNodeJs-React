import React, { useState } from "react";
import './style.css';

const SignIn = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/auth/singin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();
            if (response.ok) {
                const { token, user } = result;
                document.cookie = `x-access-token=${token}; path=/`;
                onLoginSuccess(user); // Envía los datos del usuario al componente padre
                setUserData(user); // Almacena los datos del usuario en el estado local
                console.log('Usuario logueado:', user); // Muestra los datos del usuario en consola
            } else {
                setError(result.message || 'Error de inicio de sesión');
            }
        } catch (error) {
            console.error('Error de red:', error);
            setError('Error de red: No se pudo conectar al servidor');
        }
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <label className="login-label">Email:</label>
                <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter your email"
                    className="login-input"
                    type="email"
                    required
                />
                <label className="login-label">Password:</label>
                <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="login-input"
                    type="password"
                    required
                />
                <button className="login-button" type="submit">Login</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    )
}

export default SignIn;
