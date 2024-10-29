"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// misc/db.ts
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Database connection configuration
const pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
});
// Test database connection
pool.connect((err, client, done) => {
    if (err) {
        return console.error('Error acquiring client:', err.stack);
    }
    if (client) {
        client.query('SELECT NOW()', (err, result) => {
            done();
            if (err) {
                return console.error('Error executing query:', err.stack);
            }
            console.log('Connected to database successfully');
        });
    }
});
exports.default = pool;
