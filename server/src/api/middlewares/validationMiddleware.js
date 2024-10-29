"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegistration = void 0;
const express_validator_1 = require("express-validator");
exports.validateRegistration = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email format'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
exports.default = exports.validateRegistration;
