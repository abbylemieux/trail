-- seeds.sql
\c trail_finder_db

-- Insert test users (passwords would be hashed in real application)
INSERT INTO users (username, email, password) VALUES
    ('john_hiker', 'john@example.com', 'password123'),
    ('sarah_trails', 'sarah@example.com', 'password123'),
    ('mike_outdoor', 'mike@example.com', 'password123');

-- Insert some trail references (these would be actual trail IDs from the API)
INSERT INTO trail_references (api_trail_id, last_known_name, popularity_score) VALUES
    ('YOS123', 'Yosemite Half Dome Trail', 150),
    ('GRC456', 'Grand Canyon Bright Angel Trail', 120),
    ('ZIO789', 'Zion Angels Landing', 140);

-- Insert some user trail interactions
INSERT INTO user_trail_interactions (user_id, api_trail_id, interaction_type) VALUES
    (1, 'YOS123', 'completed'),
    (1, 'GRC456', 'saved'),
    (2, 'ZIO789', 'completed'),
    (2, 'YOS123', 'saved'),
    (3, 'GRC456', 'view');

-- Insert some reviews
INSERT INTO reviews (user_id, api_trail_id, rating, comment) VALUES
    (1, 'YOS123', 5, 'Amazing views, challenging but worth it!'),
    (2, 'ZIO789', 4, 'Breathtaking trail, but very crowded'),
    (3, 'GRC456', 5, 'One of the best hikes in the Grand Canyon');

-- Insert some hiking history
INSERT INTO hiking_history (user_id, api_trail_id, start_time, end_time, distance_covered) VALUES
    (1, 'YOS123', '2024-03-15 08:00:00', '2024-03-15 16:00:00', 14.2),
    (2, 'ZIO789', '2024-03-16 09:00:00', '2024-03-16 15:00:00', 5.4),
    (3, 'GRC456', '2024-03-17 07:00:00', '2024-03-17 14:00:00', 9.6);