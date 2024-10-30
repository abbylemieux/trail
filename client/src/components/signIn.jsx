import React, {useState} from "react";
import {Title, Container} from "@mantine/core";
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
                    <input
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}    
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <button type="submit">Sign In</button>
                </form>
                {error && <div className="error">{error}</div>}
            </Container>
        </div>
    );
};

export default SignIn;