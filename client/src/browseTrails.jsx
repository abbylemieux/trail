
import React, { useEffect, useState } from 'react';
import { ArrowRight, Star, Bookmark } from 'lucide-react';
import './BrowseTrails.css';

const BrowseTrails = () => {
  const [trails, setTrails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const trailsPerPage = 12;
  const [bookmarkedTrails, setBookmarkedTrails] = useState({});

  // API Constants
  const TRAIL_API_BASE_URL = 'https://9ioacg5nhe-dsn.algolia.net/1/indexes/alltrails_primary_en-US/query';
  const TRAIL_API_KEY = '63a3cf94e0042b9c67abf0892fc1d223';
  const TRAIL_API_APPLICATION_ID = '9IOACG5NHE';

  const getRandomNatureImage = () => {
    const placeholderImages = [
      'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3',  // Hiking trail
      'https://images.unsplash.com/photo-1527489377706-5bf97e608852?ixlib=rb-4.0.3',  // Mountain trail
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3',  // Forest
      'https://images.unsplash.com/photo-1665955768907-73686b2f351d?ixlib=rb-4.0.3',  // Nature path
      'https://images.unsplash.com/photo-1587502537745-84b86da1204f?ixlib=rb-4.0.3',   // Scenic trail
      'https://images.unsplash.com/photo-1591815707291-b18c9f24fb40?ixlib=rb-4.0.3',  // Mountain view
      'https://images.unsplash.com/photo-1580238053495-b9720401fd45?ixlib=rb-4.0.3',  // Valley view
      'https://images.unsplash.com/photo-1571983823232-07c47c4527a0?ixlib=rb-4.0.3',  // Forest path
    ];

    return placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
  };

  // Fetch trails from the API
  const fetchTrails = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(TRAIL_API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Algolia-API-Key': TRAIL_API_KEY,
          'X-Algolia-Application-Id': TRAIL_API_APPLICATION_ID,
        },
        body: JSON.stringify({
          query: '',
          filters: 'type:trail',
          hitsPerPage: 50,
          attributesToRetrieve: [
            'name',
            'length',
            'difficulty',
            'rating',
            'url',
            'location',
            'description'
          ]
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Trail data:', data); // Debug log
      
      if (data.hits) {
        const formattedTrails = data.hits.map(trail => ({
          ...trail,
          imageUrl: getRandomNatureImage()
        }));
        setTrails(formattedTrails);
      } else {
        setError('No trails found.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to fetch trails. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch trails on component mount
  useEffect(() => {
    fetchTrails();
  }, []);

  // Filter trails based on the search query
  const filteredTrails = trails.filter(trail =>
    trail.name && trail.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get current trails for pagination
  const indexOfLastTrail = currentPage * trailsPerPage;
  const indexOfFirstTrail = indexOfLastTrail - trailsPerPage;
  const currentTrails = filteredTrails.slice(indexOfFirstTrail, indexOfLastTrail);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle bookmark toggle
  const toggleBookmark = (trailId) => {
    setBookmarkedTrails((prevState) => ({
      ...prevState,
      [trailId]: !prevState[trailId],
    }));
  };

  return (
    <div className="page-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Find Your Outside</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by city, park, or trail name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Trail Grid Section */}
      <div className="trail-section">
        <h2 className="section-title">Local Favorites Near You</h2>
        {loading ? (
          <p className="loading-text">Loading trails...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : currentTrails.length > 0 ? (
          <div className="trail-grid">
            {currentTrails.map((trail) => (
              <div key={trail.objectID} className="trail-card">
                <img
                  src={trail.imageUrl}
                  alt={trail.name || 'Trail view'}
                  className="trail-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3';
                  }}
                />
                <div className="trail-info">
                  <h3 className="trail-name">{trail.name}</h3>
                  <p className="trail-distance">Distance: {trail.length || 'N/A'} mi</p>
                  <p className="trail-difficulty">Difficulty: {trail.difficulty || 'N/A'}</p>
                  <div className="trail-meta">
                    <Star className="trail-icon" />
                    <span>{trail.rating || 'N/A'}</span>
                    <Bookmark
                      className={`trail-bookmark ${bookmarkedTrails[trail.objectID] ? 'bookmarked' : ''}`}
                      onClick={() => toggleBookmark(trail.objectID)}
                    />
                  </div>
                  <button
                    className="view-trail-button"
                    onClick={() => window.open(trail.url, '_blank')}
                  >
                    View Trail <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-trails-text">No trails found</p>
        )}

        {/* Pagination */}
        <div className="pagination">
          {[...Array(Math.ceil(filteredTrails.length / trailsPerPage)).keys()].map((number) => (
            <button
              key={number}
              onClick={() => paginate(number + 1)}
              className={`page-link ${currentPage === number + 1 ? 'active' : ''}`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseTrails;

