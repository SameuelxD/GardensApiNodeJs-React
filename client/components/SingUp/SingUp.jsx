import React, { useState, useEffect } from "react";
import './style.css';
import Swal from 'sweetalert2';

const SingUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rol_id, setRol] = useState('');
    const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

    useEffect(() => {
        let timer;
        if (registrationSuccessful) {
            timer = setTimeout(() => {
                setRegistrationSuccessful(false);
                window.location.href = '/singin'; // Redirige a SignIn después de 3 segundos
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [registrationSuccessful]);


    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/auth/singup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password, rol_id })
            });

            const data = await response.json();
            if (response.ok) {
                setRegistrationSuccessful(true);
                setUsername('');
                setEmail('');
                setPassword('');
                setRol('');
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful!',
                    text: 'You have been successfully registered.',
                    timer: 3000, // tiempo en milisegundos (en este caso, 3 segundos)
                    timerProgressBar: true, // muestra una barra de progreso
                    showConfirmButton: true // oculta el botón de confirmación
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Error',
                    text: data.message || 'Error de registro',
                    timer: 3000, // tiempo en milisegundos (en este caso, 3 segundos)
                    timerProgressBar: true, // muestra una barra de progreso
                    showConfirmButton: true // oculta el botón de confirmación
                });
            }
        } catch (error) {
            console.error('Error de red:', error);
            Swal.fire({
                icon: 'error',
                title: 'Network Error',
                text: 'Could not connect to the server.',
                timer: 3000, // tiempo en milisegundos (en este caso, 3 segundos)
                timerProgressBar: true, // muestra una barra de progreso
                showConfirmButton: true // oculta el botón de confirmación
            });
        }
    }

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSignUp}>
                <label className="signup-label">Username:</label>
                <input
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Enter your username"
                    className="signup-input"
                    type="text"
                    required
                />
                <label className="signup-label">Email:</label>
                <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter your email"
                    className="signup-input"
                    type="email"
                    required
                />
                <label className="signup-label">Password:</label>
                <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="signup-input"
                    type="password"
                    required
                />
                <label className="signup-label">Role:</label>
                <select
                    value={rol_id}
                    onChange={(event) => setRol(event.target.value)}
                    className="signup-input"
                    required
                >
                    <option value="">Select a role</option>
                    <option value="1">User</option>
                    <option value="2">Moderator</option>
                    <option value="3">Admin</option>
                </select>
                <button className="signup-button" type="submit">Sign Up</button>
            </form>
            {registrationSuccessful && <p className="success-message">Registration successful!</p>}
        </div>
    );
}

export default SingUp;
