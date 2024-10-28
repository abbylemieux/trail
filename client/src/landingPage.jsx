import React from 'react';
import './LandingPage.css';
import { Link } from "react-router-dom"
// import nav from './Nav.jsx';


const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <header className="landing-page-nav">
        <Link key={1} className="logo" to="/">
          TrailTrekker.io
        </Link>
        <nav>
          <Link to="/for-you">For You</Link>
          <Link to="/near-you">Near You</Link>
          <Link to="/your-trails">Your Trails</Link>
          <Link className="cta-buttons" to="/login">
            Log In
          </Link>
          <Link className="primary-btn" to="/sign-up">
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Unlock Your Adventure Potential</h1>
          <p>
            Discover the best trails and connect with hikers around the world.
          </p>
          <div className="cta-buttons">
            <Link key={2} className="primary-btn" to="/sign-up">Sign Up</Link>
            <button className="secondary-btn">Browse Trails</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
