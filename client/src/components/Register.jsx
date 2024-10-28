import React, { useState } from 'react';

import '/src/Styles/Register.css'
import { Link } from "react-router-dom";
import { register } from '/src/services/authService.js'

const RegisterForm = ({ onRegister }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await register(name, email, password);
    onRegister();
    } catch (error) {
    alert('Registration failed');
    }
    };


    return (
        <><header>
            <Link key={1} className="logo2" to="/">TrailTrekker.io</Link>
        </header>
        <div className='reg'>

                <h2>Join TrailTrekker</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required />
                    <button type="submit">Start Your Journey</button>
                </form>
                
            </div></>
    );
};

export default RegisterForm;