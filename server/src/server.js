"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./config/database"));
const thirdPartyRoutes_1 = __importDefault(require("./api/routes/thirdPartyRoutes"));
const userRoutes_1 = __importDefault(require("./api/routes/userRoutes"));
const errorHandler_1 = __importDefault(require("./api/middlewares/errorHandler"));
const authMiddleware_1 = require("./api/middlewares/authMiddleware");
const authRoutes_1 = __importDefault(require("./api/routes/authRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    optionsSuccessStatus: 204,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// Public Routes
app.use('/api/auth', authRoutes_1.default);
// Protected Routes
app.use('/api/user', authMiddleware_1.authMiddleware, userRoutes_1.default);
app.use('/api', thirdPartyRoutes_1.default);
app.get('/api/data', (req, res) => {
    res.json({ message: 'Yooooo it actually worked' });
});
app.use(errorHandler_1.default);
database_1.default.sync()
    .then(() => {
    console.log('Database connected!');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
    .catch((error) => {
    console.error('Database connection error:', error);
    throw new Error('Unable to connect to the database');
});
