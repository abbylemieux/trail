import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'error' or 'success'

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            setMessageType('error');
            return;
        }

        const newUser = { username, email, password };

        axios.post('http://localhost:3001/register', newUser)
            .then(response => {
                setMessage(response.data.message);
                setMessageType('success');
                // Clear form on success
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            })
            .catch(error => {
                console.error(error);
                setMessage('Registration failed. Please try again.');
                setMessageType('error');
            });
    };

    return (
        <div className='reg'>
            <h2>Join TrailTrekker</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Start Your Journey</button>
            </form>
            {message && (
                <p className={messageType === 'error' ? 'error-message' : 'success-message'}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default Register;