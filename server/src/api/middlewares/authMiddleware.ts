import { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        user?: { id: string };
    }
}
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'No token provided' });
        return; 
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        req.user = { id: decoded.userId };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
        return; 
    }
};
