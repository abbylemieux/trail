import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SuggestedTrails.css';

const SuggestedTrails = () => {
  const [trails, setTrails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();

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
    try {
      // Simulated API call based on the fitness level
      const response = await fetch(`https://example-api.com/trails?difficulty=${level}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setTrails(data);
    } catch (err) {
      setError('Failed to fetch trails. Please try again later.');
    } finally {
      setLoading(false);
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
          <div key={trail.id} className="trail-card">
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
