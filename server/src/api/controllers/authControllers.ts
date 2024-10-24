import { Request, Response } from "express";
import { login, register } from "../services/authServices";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;
        const token = await register ({ email, password, name });
        res.status(201).json({ token });
    } catch (error) {
        const errorMessage = (error as any).message;
        res.status(400).json({ message: 'Error registering user', error: errorMessage });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const token = await login ({ email, password });
        res.status(200).json({ token });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(401).json({ message: 'Error logging in', error: errorMessage });
    }
};