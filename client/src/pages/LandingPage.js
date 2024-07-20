import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Welcome to College Portal</h2>
            <nav>
                <Link to="/login" style={{ margin: '0 10px' }}>Login</Link>
                <Link to="/signup" style={{ margin: '0 10px' }}>Signup</Link>
            </nav>
        </div>
    );
};

export default LandingPage;
