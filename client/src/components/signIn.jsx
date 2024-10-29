import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Your sign-in logic here
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="sign-in-container">
            <Link to="/" className="logo2">TrailTrekker</Link>
            
            <div className="signin-form">
                <h2 className="form-title">Welcome Back</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="signin-button">
                        Sign In
                    </button>

                    <div className="additional-options">
                        <Link to="/forgot-password" className="forgot-password">
                            Forgot Password?
                        </Link>
                    </div>

                    <div className="register-link">
                        Don't have an account? <Link to="/register">Register here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;