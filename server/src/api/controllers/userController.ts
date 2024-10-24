import { Request, Response } from 'express';
import { getUserById } from '../services/userServices';
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(400).json({ message: 'User not authenticated' });
            return; 
        }
        const user = await getUserById(req.user.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user profile' });
    }
};

export const updateUserProfile = async (req: Request, res: Response) => {
};
