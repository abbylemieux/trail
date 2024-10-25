import React, { useState, useEffect } from 'react';
import axios from 'axios';

const hikeApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-token-here',
    };

    axios.get('https://api.example.com/data', { headers: headers })
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>API Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default hikeApi;
