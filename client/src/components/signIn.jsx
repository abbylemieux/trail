import React, {useState} from "react";
import {TextInput, Button, Title, Container} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./signIn.css";


const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted');
    };

    const handleEmailChange = (e) => {
        console.log('Email input changed');
        setEmail(e.target.value);
    };
    
    const handlePasswordChange = (e) => {
        console.log('Password input changed');
        setPassword(e.target.value);
    };

    return (
        <div className="sign-in-container">
            <Container>
                <Title className="title">Sign In</Title>
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}    
                        required
                        labelProps={{ style: { color: 'inherit' }, required: false }}
                    />
                    <TextInput
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <Button type="submit">Sign In</Button>
                </form>
                {error && <div className="error">{error}</div>}
            </Container>
        </div>
    );
};

export default SignIn;