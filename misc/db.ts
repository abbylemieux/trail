// misc/db.ts
import { Pool, PoolClient } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Database connection configuration
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
});

// Test database connection
pool.connect((err: Error | undefined, client: PoolClient | undefined, done: (release?: any) => void) => {
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

export default pool;