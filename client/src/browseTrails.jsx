import React, { useEffect, useState } from 'react';
import { ArrowRight, Compass, Loader2, Map, Mountain, Navigation, Share2, Star } from 'lucide-react';

const BrowseTrails = () => {
  const [trails, setTrails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('distance');
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  const API_KEY = 'your_actual_api_key';
  const API_URL = 'https://your_actual_api_url';

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'bg-green-100 text-green-800',
      moderate: 'bg-yellow-100 text-yellow-800',
      hard: 'bg-red-100 text-red-800',
      expert: 'bg-purple-100 text-purple-800'
    };
    return colors[difficulty.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const getSortedAndFilteredTrails = () => {
    let filteredTrails = trails;
    if (filterDifficulty !== 'all') {
      filteredTrails = trails.filter(trail =>
        trail.difficulty.toLowerCase() === filterDifficulty.toLowerCase()
      );
    }
    return filteredTrails.sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'difficulty':
          return a.difficulty.localeCompare(b.difficulty);
        case 'length':
          return a.length - b.length;
        default:
          return 0;
      }
    });
  };

  const fetchTrails = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}?apikey=${API_KEY}`);
      if (!response.ok) {
        throw new Error('Failed to fetch trails');
      }
      const data = await response.json();
      setTrails(data.trails);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrails();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p>Loading trails near you...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600">{error}</p>
        <button onClick={fetchTrails} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Trails Near You</h1>
      <div className="flex gap-4 my-4">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded-md px-3 py-2">
          <option value="distance">Sort by Distance</option>
          <option value="difficulty">Sort by Difficulty</option>
          <option value="length">Sort by Length</option>
        </select>
        <select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)} className="border rounded-md px-3 py-2">
          <option value="all">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="moderate">Moderate</option>
          <option value="hard">Hard</option>
          <option value="expert">Expert</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getSortedAndFilteredTrails().map(trail => (
          <div key={trail.id} className="border p-4 rounded-lg hover:shadow-lg">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">{trail.name}</h2>
              <button>
                <Share2 className="text-gray-600" />
              </button>
            </div>
            <p className="text-gray-600">{trail.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className={`px-3 py-1 rounded-full ${getDifficultyColor(trail.difficulty)}`}>
                {trail.difficulty}
              </span>
              <span className="flex items-center text-gray-600">
                <Compass className="h-4 w-4" /> {trail.length} mi
              </span>
              <span className="flex items-center text-gray-600">
                <Mountain className="h-4 w-4" /> {trail.elevation} ft gain
              </span>
              {trail.rating && (
                <span className="flex items-center text-yellow-400">
                  <Star className="h-4 w-4" /> {trail.rating}
                </span>
              )}
            </div>
            <button onClick={() => window.open(trail.url, '_blank')} className="w-full mt-4 flex justify-center gap-2 bg-blue-500 text-white rounded-lg px-4 py-2">
              <Map className="h-4 w-4" /> View Trail <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseTrails;
