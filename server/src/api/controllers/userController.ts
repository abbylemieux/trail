import { Request, Response } from 'express';
import { getUserById } from '../services/userService';

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id; // Assuming req.user is set by auth middleware
        const user = await getUserById(userId);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user profile' });
    }
};

export const updateUserProfile = async (req: Request, res: Response) => {
    // Logic to update user profile
};
