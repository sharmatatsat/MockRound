import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentLoginPage.css'; 

const StudentLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = {
            email: email.trim(),
            password: password
        };

        try {
            const response = await fetch('http://localhost:5000/api/students/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                navigate('/student/profile'); 
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Login failed');
            }
        } catch (error) {
            setError('Login failed: ' + error.message);
        }
    };

    const handleSignUp = () => {
        navigate('/student/signup');
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Student Login</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    required
                />
                <button type="submit">Login</button>
                {error && <p className="error-message">{error}</p>}
                <button type="button" onClick={handleSignUp} className="signup-button">Sign Up</button>
            </form>
        </div>
    );
};

export default StudentLoginPage;
