import React from 'react';
import './LandingPage.css';
import { Link } from "react-router-dom"






const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <header className="landing-page-nav">
        <div className="logo">TrailTrekker.io</div>
        <nav>
          <a href="#">For You</a>
          <a href="#">Near You</a>
          <a href="#">Your Trails</a>
          <a href="#">Log In</a>
          <button className="join-btn">Join Now</button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Unlock Your Adventure Potential</h1>
          <p>Discover the best trails and connect with hikers around the world.</p>
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
