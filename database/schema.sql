-- schema.sql
\c trail_finder_db


-- Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE
);

-- Trail References table (minimal trail data, mainly for maintaining relationships)
CREATE TABLE trail_references (
    trail_ref_id SERIAL PRIMARY KEY,
    api_trail_id VARCHAR(100) NOT NULL UNIQUE,
    last_known_name VARCHAR(255),
    popularity_score INTEGER DEFAULT 0,
    is_deleted BOOLEAN DEFAULT FALSE
);

-- User Trail Interactions table
CREATE TABLE user_trail_interactions (
    interaction_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    api_trail_id VARCHAR(100) NOT NULL,
    interaction_type VARCHAR(50) NOT NULL CHECK (interaction_type IN ('view', 'completed', 'saved')),
    interaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE
);

-- Reviews table
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    api_trail_id VARCHAR(100) NOT NULL,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE
);

-- User Hiking History
CREATE TABLE hiking_history (
    history_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    api_trail_id VARCHAR(100) NOT NULL,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    distance_covered FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE
);

-- Create indexes for frequent queries
CREATE INDEX idx_user_trail_interactions_user_id ON user_trail_interactions(user_id);
CREATE INDEX idx_user_trail_interactions_trail_id ON user_trail_interactions(api_trail_id);
CREATE INDEX idx_reviews_trail_id ON reviews(api_trail_id);
CREATE INDEX idx_hiking_history_user_id ON hiking_history(user_id);