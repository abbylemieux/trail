import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SuggestedTrails.css';

const SuggestedTrails = () => {
  const [trails, setTrails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();

  const TRAIL_API_BASE_URL = 'https://9ioacg5nhe-dsn.algolia.net/1/indexes/alltrails_primary_en-US/query';
  const TRAIL_API_KEY = '63a3cf94e0042b9c67abf0892fc1d223';
  const TRAIL_API_APPLICATION_ID = '9IOACG5NHE';

  // Extract the fitness level from the location state
  const { fitnessLevel } = location.state || { fitnessLevel: null };

  useEffect(() => {
    if (fitnessLevel) {
      fetchTrails(fitnessLevel);
    }
  }, [fitnessLevel]);

  const fetchTrails = async (level) => {
    setLoading(true);
    setError('');

    // Adjust query based on fitness level
    const query = getQueryForLevel(level);

    try {
      const response = await fetch(TRAIL_API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Algolia-API-Key': TRAIL_API_KEY,
          'X-Algolia-Application-Id': TRAIL_API_APPLICATION_ID,
        },
        body: JSON.stringify({ query, hitsPerPage: 10 }), // Adjusted to filter by fitness level
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setTrails(data.hits); // Accessing trails from the 'hits' array
    } catch (err) {
      setError('Failed to fetch trails. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to determine the query based on fitness level
  const getQueryForLevel = (level) => {
    switch (level) {
      case 'Beginner':
        return 'Beginner';
      case 'Moderate':
        return 'Moderate';
      case 'Advanced':
        return 'Advanced';
      case 'Expert':
        return 'Expert';
      default:
        return '';
    }
  };

  if (loading) return <p>Loading trails...</p>;
  if (error) return <p>{error}</p>;
  if (trails.length === 0) return <p>No trails found for your fitness level.</p>;

  return (
    <div className="suggested-trails-container">
      <h1>Suggested Trails for {fitnessLevel} Level</h1>
      <div className="trail-grid">
        {trails.map((trail) => (
          <div key={trail.objectID} className="trail-card">
            <img src={trail.imageUrl || 'https://via.placeholder.com/300'} alt={trail.name} className="trail-image" />
            <div className="trail-info">
              <h3 className="trail-name">{trail.name}</h3>
              <p className="trail-length">Length: {trail.length} miles</p>
              <p className="trail-rating">Rating: {trail.rating}</p>
              <p className="trail-difficulty">Difficulty: {trail.difficulty}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedTrails;
