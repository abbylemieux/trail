"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'An unexpected error occurred';
    if (process.env.NODE_ENV === 'development') {
        console.error('Error stack:', err.stack);
    }
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};
exports.default = errorHandler;
