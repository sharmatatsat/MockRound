import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';

const StudentSignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = {
            email: email.trim(),
            password: password,
        };

        try {
            const response = await fetch('http://localhost:5000/api/students/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                navigate('/student/login');
            } else {
                console.log('Signup error');
            }
        } catch (error) {
            console.log('Signup error:', error);
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2>Student Sign Up</h2>
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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default StudentSignupPage;
