
export interface User {
    user_id: number;
    username: string;
    email: string;
    password: string;
    created_at: Date;
    is_deleted: boolean;
}

export interface TrailReference {
    trail_ref_id: number;
    api_trail_id: string;
    last_known_name: string;
    popularity_score: number;
    is_deleted: boolean;
}

export interface UserTrailInteraction {
    interaction_id: number;
    user_id: number;
    api_trail_id: string;
    interaction_type: 'view' | 'completed' | 'saved';
    interaction_date: Date;
    is_deleted: boolean;
}

export interface Review {
    review_id: number;
    user_id: number;
    api_trail_id: string;
    rating: number;
    comment: string;
    created_at: Date;
    is_deleted: boolean;
}

export interface HikingHistory {
    history_id: number;
    user_id: number;
    api_trail_id: string;
    start_time: Date;
    end_time: Date;
    distance_covered: number;
    created_at: Date;
    is_deleted: boolean;
}

// Error types
export class DatabaseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DatabaseError';
    }
}