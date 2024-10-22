import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/database';
import thirdPartyRoutes from './api/routes/thirdPartyRoutes';
import userRoutes from './api/routes/userRoutes';
import errorHandler from './api/middlewares/errorHandler';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Use routes
app.use('/api', thirdPartyRoutes);
app.use('/api', userRoutes);

// Error handler should be the last middleware
app.use(errorHandler);

sequelize.sync()
    .then(() => {
        console.log('Database connected!');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.log('Database connection error:', error));
