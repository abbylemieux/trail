import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
    statusCode?: number;
}

// Error-handling middleware
const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Default status code and message
    const statusCode = err.statusCode || 500;
    const message = err.message || 'An unexpected error occurred';

    // Log the error stack in development for debugging
    if (process.env.NODE_ENV === 'development') {
        console.error('Error stack:', err.stack);
    }

    // Respond with a JSON error object
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};

export default errorHandler;
