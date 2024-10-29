import { Sequelize } from 'sequelize';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '../server/.env' });

console.log("Database Name:", process.env.DB_NAME);
console.log("Database User:", process.env.DB_USER);
console.log("Database Password:", process.env.DB_PASSWORD);  // Ensure it logs as expected
console.log("Database Host:", process.env.DB_HOST);
console.log("Database Port:", process.env.DB_PORT);

const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: 'postgres',
        logging: console.log,
    }
);



export default sequelize;
