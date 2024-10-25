import { Request, Response } from 'express';
import axios from 'axios';

export const trailApi = async (req: Request, res: Response) => {
    try {
        const response = await axios.get('https://');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from API 1' });
    }
};

export const weatherApi = async (req: Request, res: Response) => {
    try {
        const response = await axios.get('https://');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from API 2' });
    }
};
