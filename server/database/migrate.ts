import { readFileSync } from 'fs';
import path from 'path';
import pool from './db';

async function runMigrations() {
    try {
        const schemaPath = path.resolve(__dirname, 'schema.sql');
        const schemaSQL = readFileSync(schemaPath, 'utf-8');
        await pool.query(schemaSQL);
        console.log('Database migrations executed successfully');
    } catch (error) {
        console.error('Error running migrations:', error);
    } finally {
        await pool.end();
    }
}

runMigrations();