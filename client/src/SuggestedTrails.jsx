import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Styles/SuggestedTrails.css";

const TRAIL_API_BASE_URL =
  "https://9ioacg5nhe-dsn.algolia.net/1/indexes/alltrails_primary_en-US/query";
const TRAIL_API_KEY = "63a3cf94e0042b9c67abf0892fc1d223";
const TRAIL_API_APPLICATION_ID = "9IOACG5NHE";

const SuggestedTrails = () => {
  const [trails, setTrails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const { fitnessLevel } = location.state || {};

  useEffect(() => {
    if (fitnessLevel) {
      fetchTrails(fitnessLevel);
    }
  }, [fitnessLevel]);

  const fetchTrails = async (level) => {
    setLoading(true);
    setError("");

    const query = level ? `${level} trails` : "";

    try {
      const response = await fetch(TRAIL_API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Algolia-API-Key": TRAIL_API_KEY,
          "X-Algolia-Application-Id": TRAIL_API_APPLICATION_ID,
        },
        body: JSON.stringify({
          query,
          hitsPerPage: 50,
          filters: `difficulty:${level}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch trails.");
      }

      const data = await response.json();
      setTrails(data.hits);
    } catch (err) {
      setError("Failed to fetch trails. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading trails...</p>;
  if (error) return <p>{error}</p>;
  if (!trails.length) return <p>No trails found for {fitnessLevel} level.</p>;

  return (
    <div className="suggested-trails-container">
      <h1>Suggested Trails for {fitnessLevel} Level</h1>
      <div className="trail-grid">
        {trails.map((trail) => (
          <div key={trail.objectID} className="trail-card">
            <img
              src={trail.imageUrl || "https://via.placeholder.com/300"}
              alt={trail.name}
              className="trail-image"
            />
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
