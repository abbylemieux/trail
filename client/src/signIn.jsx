import React, {useState} from "react";
import {TextInput, Button, Title, Container} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import './signIn.css';


const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', {email, password});
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <Container>
            <Title>Sign In </Title>
            <form onSubmit={handleSubmit}>
                <TextInput
                    label="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextInput
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                    <Button type="submit">Sign In</Button>
                </form>
        </Container>
    );
};

export default SignIn;

