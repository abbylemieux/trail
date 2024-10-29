"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// misc/queries.ts
const db_1 = __importDefault(require("./db"));
const sequelize_1 = require("sequelize");
class DatabaseQueries {
    // User Queries
    static createUser(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.default.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password]);
                return result.rows[0];
            }
            catch (error) {
                throw new sequelize_1.DatabaseError({
                    name: 'DatabaseError',
                    message: error.message,
                    // original: error as Error,
                    sql: '' // Add the SQL query that caused the error if available
                });
            }
        });
    }
    static getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.default.query('SELECT * FROM users WHERE user_id = $1 AND is_deleted = false', [userId]);
                return result.rows[0] || null;
            }
            catch (error) {
                throw new sequelize_1.DatabaseError({
                    name: 'DatabaseError',
                    message: error.message,
                    // original: error as Error,
                    sql: '' // Add the SQL query that caused the error if available
                });
            }
        });
    }
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.default.query('SELECT * FROM users WHERE email = $1 AND is_deleted = false', [email]);
                return result.rows[0] || null;
            }
            catch (error) {
                throw new sequelize_1.DatabaseError({
                    name: 'DatabaseError',
                    message: error.message,
                    // original: error as Error,
                    sql: '' // Add the SQL query that caused the error if available
                });
            }
        });
    }
    // Trail Interaction Queries
    static addTrailInteraction(userId, apiTrailId, interactionType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.default.query(`INSERT INTO user_trail_interactions 
                (user_id, api_trail_id, interaction_type) 
                VALUES ($1, $2, $3) RETURNING *`, [userId, apiTrailId, interactionType]);
                return result.rows[0];
            }
            catch (error) {
                throw new sequelize_1.DatabaseError({
                    name: 'DatabaseError',
                    message: error.message,
                    // original: error as Error,
                    sql: '' // Add the SQL query that caused the error if available
                });
            }
        });
    }
    // Review Queries
    static addReview(userId, apiTrailId, rating, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.default.query(`INSERT INTO reviews 
                (user_id, api_trail_id, rating, comment) 
                VALUES ($1, $2, $3, $4) RETURNING *`, [userId, apiTrailId, rating, comment]);
                return result.rows[0];
            }
            catch (error) {
                throw new sequelize_1.DatabaseError({
                    name: 'DatabaseError',
                    message: error.message,
                    // original: error as Error,
                    sql: '' // Add the SQL query that caused the error if available
                });
            }
        });
    }
    // Hiking History Queries
    static addHikingRecord(userId, apiTrailId, startTime, endTime, distanceCovered) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.default.query(`INSERT INTO hiking_history 
                (user_id, api_trail_id, start_time, end_time, distance_covered) 
                VALUES ($1, $2, $3, $4, $5) RETURNING *`, [userId, apiTrailId, startTime, endTime, distanceCovered]);
                return result.rows[0];
            }
            catch (error) {
                throw new sequelize_1.DatabaseError({
                    name: 'DatabaseError',
                    message: error.message,
                    // original: error as Error,
                    sql: '' // Add the SQL query that caused the error if available
                });
            }
        });
    }
    // Popular Trails Query
    static getPopularTrails() {
        return __awaiter(this, arguments, void 0, function* (limit = 10) {
            try {
                const result = yield db_1.default.query(`SELECT t.*, COUNT(i.interaction_id) as interaction_count 
                FROM trail_references t 
                LEFT JOIN user_trail_interactions i ON t.api_trail_id = i.api_trail_id 
                WHERE t.is_deleted = false 
                GROUP BY t.trail_ref_id 
                ORDER BY interaction_count DESC 
                LIMIT $1`, [limit]);
                return result.rows;
            }
            catch (error) {
                throw new sequelize_1.DatabaseError({
                    name: 'DatabaseError',
                    message: error.message,
                    // original: error as Error,
                    sql: '' // Add the SQL query that caused the error if available
                });
            }
        });
    }
    // User Statistics
    static getUserStats(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.default.query(`SELECT 
                    COUNT(DISTINCT h.api_trail_id) as unique_trails_hiked,
                    SUM(h.distance_covered) as total_distance,
                    COUNT(r.review_id) as total_reviews
                FROM users u 
                LEFT JOIN hiking_history h ON u.user_id = h.user_id 
                LEFT JOIN reviews r ON u.user_id = r.user_id 
                WHERE u.user_id = $1 AND u.is_deleted = false`, [userId]);
                return result.rows[0];
            }
            catch (error) {
                throw new sequelize_1.DatabaseError({
                    name: 'DatabaseError',
                    message: error.message,
                    // parent: error as Error,
                    // original: error as Error,
                    sql: '' // Add the SQL query that caused the error if available
                });
            }
        });
    }
}
exports.default = DatabaseQueries;
