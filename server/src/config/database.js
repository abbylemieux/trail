"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../server/.env' });
console.log("Database Name:", process.env.DB_NAME);
console.log("Database User:", process.env.DB_USER);
console.log("Database Password:", process.env.DB_PASSWORD); // Ensure it logs as expected
console.log("Database Host:", process.env.DB_HOST);
console.log("Database Port:", process.env.DB_PORT);
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    logging: console.log,
});
exports.default = sequelize;
