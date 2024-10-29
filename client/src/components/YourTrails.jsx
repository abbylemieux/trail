import React, { useEffect, useState } from 'react';
import '/src/styles/YourTrails.css'

const HikesAlreadyDone = () => {
  const [hikes, setHikes] = useState([]);
  const [hikeName, setHikeName] = useState('');

  // Load hikes from local storage on component mount
  useEffect(() => {
    const storedHikes = JSON.parse(localStorage.getItem('hikesDone')) || [];
    setHikes(storedHikes);
  }, []);

  // Add a new hike to local storage
  const addHike = () => {
    if (hikeName) {
      const newHikes = [...hikes, hikeName];
      setHikes(newHikes);
      localStorage.setItem('hikesDone', JSON.stringify(newHikes));
      setHikeName(''); // Clear input field
    }
  };

  // Remove a hike from local storage
  const removeHike = (hike) => {
    const updatedHikes = hikes.filter((h) => h !== hike);
    setHikes(updatedHikes);
    localStorage.setItem('hikesDone', JSON.stringify(updatedHikes));
  };

  return (
    <div>
      <h1 className='title1'>Hikes Already Done</h1>
      <input
        type="text"
        value={hikeName}
        onChange={(e) => setHikeName(e.target.value)}
        placeholder="Enter hike name"
      />
      <button className="button" onClick={addHike}>Add Hike</button>
      
      <ul>
        {hikes.map((hike, index) => (
          <li key={index}>
            {hike}
            <button className="button2" onClick={() => removeHike(hike)}>Remove</button>
          </li>
        ))}
      </ul>

      {hikes.length === 0 && <p className='hikes'>No hikes added yet. Add some!</p>}
    </div>
  );
};

export default HikesAlreadyDone;
