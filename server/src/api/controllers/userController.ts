import { Request, Response } from 'express';
import { getUserById } from '../services/userServices';
export const getUserProfile = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(400).json({ message: 'User not authenticated' });
        }
        const user = await getUserById(req.user.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user profile' });
    }
};

export const updateUserProfile = async (req: Request, res: Response) => {
};
