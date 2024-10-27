import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { ArrowRight, Compass, Loader2, Map, Mountain, Navigation, Share2, Star } from 'lucide-react';

const BrowseTrails = () => {
  const [trails, setTrails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('distance');
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  const API_KEY = 'YOUR_API_KEY_HERE'; 
  const API_URL = 'https://example.com/api/trails'; 

  // Difficulty badge color
  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'bg-green-100 text-green-800',
      moderate: 'bg-yellow-100 text-yellow-800',
      hard: 'bg-red-100 text-red-800',
      expert: 'bg-purple-100 text-purple-800'
    };
    return colors[difficulty.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  // Sort and filter functions
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

  // Fetch trails data from the API
  const fetchTrails = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}?apikey=${API_KEY}`);
      if (!response.ok) {
        throw new Error('Failed to fetch trails');
      }
      const data = await response.json();
      setTrails(data.trails); // Adjust this based on the actual API response structure
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrails();
  }, []); // Fetch trails on component mount

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
          <p className="text-gray-600">Loading trails near you...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center text-red-600 p-4 rounded-lg">
          <p>{error}</p>
          <button 
            onClick={fetchTrails} // Retry fetching trails
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Trails Near You</h1>
        <div className="flex gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm bg-white"
          >
            <option value="distance">Sort by Distance</option>
            <option value="difficulty">Sort by Difficulty</option>
            <option value="length">Sort by Length</option>
          </select>
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm bg-white"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="hard">Hard</option>
            <option value="expert">Expert</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getSortedAndFilteredTrails().map(trail => (
          <Card key={trail.id} className="hover:shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{trail.name}</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <Navigation className="h-4 w-4" />
                    <span>{trail.distance.toFixed(1)} miles away</span>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-gray-600 mb-4 line-clamp-2">{trail.description}</p>
              
              <div className="flex flex-wrap gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(trail.difficulty)}`}>
                  {trail.difficulty}
                </span>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Compass className="h-4 w-4" />
                  <span>{trail.length} mi</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Mountain className="h-4 w-4" />
                  <span>{trail.elevation}ft gain</span>
                </div>
                {trail.rating && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>{trail.rating}</span>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter>
              <button 
                onClick={() => window.open(trail.url, '_blank')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Map className="h-4 w-4" />
                View Trail
                <ArrowRight className="h-4 w-4" />
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BrowseTrails;
