// misc/queries.ts
import { Pool, QueryResult } from 'pg';
import pool from './db';
import { User, TrailReference, UserTrailInteraction, Review, HikingHistory, DatabaseError } from './dbindex';

export default class DatabaseQueries {
    // User Queries
    static async createUser(username: string, email: string, password: string): Promise<User> {
        try {
            const result = await pool.query(
                'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
                [username, email, password]
            );
            return result.rows[0];
        } catch (error) {
            throw new DatabaseError(`Error creating user: ${(error as Error).message}`);
        }
    }

    static async getUserById(userId: number): Promise<User | null> {
        try {
            const result = await pool.query(
                'SELECT * FROM users WHERE user_id = $1 AND is_deleted = false',
                [userId]
            );
            return result.rows[0] || null;
        } catch (error) {
            throw new DatabaseError(`Error fetching user: ${(error as Error).message}`);
        }
    }

    static async getUserByEmail(email: string): Promise<User | null> {
        try {
            const result = await pool.query(
                'SELECT * FROM users WHERE email = $1 AND is_deleted = false',
                [email]
            );
            return result.rows[0] || null;
        } catch (error) {
            throw new DatabaseError(`Error fetching user by email: ${(error as Error).message}`);
        }
    }

    // Trail Interaction Queries
    static async addTrailInteraction(
        userId: number, 
        apiTrailId: string, 
        interactionType: 'view' | 'completed' | 'saved'
    ): Promise<UserTrailInteraction> {
        try {
            const result = await pool.query(
                `INSERT INTO user_trail_interactions 
                (user_id, api_trail_id, interaction_type) 
                VALUES ($1, $2, $3) RETURNING *`,
                [userId, apiTrailId, interactionType]
            );
            return result.rows[0];
        } catch (error) {
            throw new DatabaseError(`Error adding trail interaction: ${(error as Error).message}`);
        }
    }

    // Review Queries
    static async addReview(
        userId: number,
        apiTrailId: string,
        rating: number,
        comment: string
    ): Promise<Review> {
        try {
            const result = await pool.query(
                `INSERT INTO reviews 
                (user_id, api_trail_id, rating, comment) 
                VALUES ($1, $2, $3, $4) RETURNING *`,
                [userId, apiTrailId, rating, comment]
            );
            return result.rows[0];
        } catch (error) {
            throw new DatabaseError(`Error adding review: ${(error as Error).message}`);
        }
    }

    // Hiking History Queries
    static async addHikingRecord(
        userId: number,
        apiTrailId: string,
        startTime: Date,
        endTime: Date,
        distanceCovered: number
    ): Promise<HikingHistory> {
        try {
            const result = await pool.query(
                `INSERT INTO hiking_history 
                (user_id, api_trail_id, start_time, end_time, distance_covered) 
                VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                [userId, apiTrailId, startTime, endTime, distanceCovered]
            );
            return result.rows[0];
        } catch (error) {
            throw new DatabaseError(`Error adding hiking record: ${(error as Error).message}`);
        }
    }

    // Popular Trails Query
    static async getPopularTrails(limit: number = 10): Promise<TrailReference[]> {
        try {
            const result = await pool.query(
                `SELECT t.*, COUNT(i.interaction_id) as interaction_count 
                FROM trail_references t 
                LEFT JOIN user_trail_interactions i ON t.api_trail_id = i.api_trail_id 
                WHERE t.is_deleted = false 
                GROUP BY t.trail_ref_id 
                ORDER BY interaction_count DESC 
                LIMIT $1`,
                [limit]
            );
            return result.rows;
        } catch (error) {
            throw new DatabaseError(`Error fetching popular trails: ${(error as Error).message}`);
        }
    }

    // User Statistics
    static async getUserStats(userId: number): Promise<any> {
        try {
            const result = await pool.query(
                `SELECT 
                    COUNT(DISTINCT h.api_trail_id) as unique_trails_hiked,
                    SUM(h.distance_covered) as total_distance,
                    COUNT(r.review_id) as total_reviews
                FROM users u 
                LEFT JOIN hiking_history h ON u.user_id = h.user_id 
                LEFT JOIN reviews r ON u.user_id = r.user_id 
                WHERE u.user_id = $1 AND u.is_deleted = false`,
                [userId]
            );
            return result.rows[0];
        } catch (error) {
            throw new DatabaseError(`Error fetching user stats: ${(error as Error).message}`);
        }
    }
}