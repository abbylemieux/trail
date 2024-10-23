import React from 'react';
import './LandingPage.css';
import Demo from './navbar'

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        
        <h1>Welcome to Trail Trekker</h1>
        <p>Discover, explore, and enjoy the best trails around you!</p>
        <button className="explore-button">Explore Trails</button>
      </header>
      <section className="features">
        
        <div className="feature-list">
          <div className="feature">
            <a><img src="./src/assets/Lincoln.jpg" width="450px"></img></a>
            <h3>Find Trails</h3>
            <p>Search for trails based on location, difficulty, and length.</p>
          </div>
          <div className="feature">
            <h3>Trail Reviews</h3>
            <p>Read and write reviews to help others find the best trails.</p>
          </div>
          <div className="feature">
            <h3>Track Your Hikes</h3>
            <p>Log your hikes and keep track of your adventures.</p>
          </div>
        </div>
      </section>
      <footer className="landing-footer">
        <p>&copy; 2024 Trails App. All rights reserved.</p>
      </footer>
    </div>
  );
};
export default LandingPage;