import React, { useState } from 'react'
import axios from 'axios';
import './Register.css'

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.")
            return;
        }

        const newUser = { username, email, password };

        axios.post('http://localhost:5000/register', newUser)
        .then(response => {
            setMessage(response.data.message);
        })
        .catch(error => {
            console.error(error);
            setMessage('Login failed');
        });
    };

    return (
        <div className='reg'>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                <button type="submit">Register</button>
                    



            </form>
            {message && <p>{message}</p>}
        </div>
    )

    
}

export default Register;