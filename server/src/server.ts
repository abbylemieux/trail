import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/database';
import thirdPartyRoutes from './api/routes/thirdPartyRoutes';
import userRoutes from './api/routes/userRoutes';
import errorHandler from './api/middlewares/errorHandler';
import { authMiddleware } from './api/middlewares/authMiddleware';
import authRoutes from './api/routes/authRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/user', authMiddleware, userRoutes);
app.use('/api', authMiddleware, thirdPartyRoutes);

app.use(errorHandler);

sequelize.sync()
    .then(() => {
        console.log('Database connected!');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.log('Database connection error:', error));
