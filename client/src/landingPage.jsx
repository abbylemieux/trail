import React from 'react';
import './LandingPage.css';
import { Link } from "react-router-dom"
import nav from './Nav.jsx';


const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <header className="landing-page-nav">
        <Link key={1} className="logo" to="/">TrailTrekker.io</Link>
        <nav>
          <a href="#">For You</a>
          <a href="#">Near You</a>
          <a href="#">Your Trails</a>
          <a href="#">Log In</a>
          <Link key={2} className="primary-btn" to="/sign-up">Sign Up</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Unlock Your Adventure Potential</h1>
          <p>Discover the best trails and connect with hikers around the world.</p>
          <div className="cta-buttons">
            <Link key={2} className="primary-btn" to="/sign-up">Sign Up</Link>
            <Link key={3} className="secondary-btn" to="/browse">Browse Trails</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
