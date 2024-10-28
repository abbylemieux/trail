import { readFileSync } from 'fs';
import path from 'path';
import pool from './db';

async function runSeeds() {
    try {
        const seedsPath = path.resolve(__dirname, 'seeds.sql');
        const seedsSQL = readFileSync(seedsPath, 'utf-8');
        await pool.query(seedsSQL);
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await pool.end();
    }
}

runSeeds();