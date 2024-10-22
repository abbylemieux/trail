import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from '';
import thirdPartyRoutes from './routes/thirdPartyRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', thirdPartyRoutes);

sequelize.sync()
    .then(() => {
        console.log('Database connected!');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.log('Database connection error:', error));
