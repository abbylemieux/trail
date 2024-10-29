import express, { Application,Request, Response } from 'express';
import dotenv from 'dotenv';
import cors, { CorsOptions } from 'cors';
import sequelize from './config/database';
import thirdPartyRoutes from './api/routes/thirdPartyRoutes';
import userRoutes from './api/routes/userRoutes';
import errorHandler from './api/middlewares/errorHandler';
import { authMiddleware } from './api/middlewares/authMiddleware';
import authRoutes from './api/routes/authRoutes';

dotenv.config({ path: '../server/.env' });

const app: Application = express();
const PORT = process.env.PORT || 5001;

const corsOptions: CorsOptions ={
    origin: process.env.CLIENT_URL || 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    optionsSuccessStatus: 204, 
};

app.use(cors(corsOptions));
app.use(express.json());

// Public Routes
app.use('/api/auth', authRoutes);

// Protected Routes
app.use('/api/user', authMiddleware, userRoutes);
app.use('/api', thirdPartyRoutes);

app.get('/api/data', (req: Request, res: Response) => {
    res.json({ message: 'Yooooo it actually worked' });
});

app.use(errorHandler);

sequelize.sync()
    .then(() => {
        console.log('Database connected!');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => {
        console.error('Database connection error:', error);
        throw new Error('Unable to connect to the database');
    });
