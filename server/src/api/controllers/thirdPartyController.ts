import { Request, Response } from 'express';
import axios from 'axios';

export const fetchFromApi1 = async (req: Request, res: Response) => {
    try {
        const response = await axios.get('https://');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from API 1' });
    }
};

export const fetchFromApi2 = async (req: Request, res: Response) => {
    try {
        const response = await axios.get('https://');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from API 2' });
    }
};
