import React from 'react';
import './Styles/landingPage.css';
import { Link } from "react-router-dom"



const LandingPage = () => {
  return (
    <div className="landing-page">
      

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Unlock Your Adventure Potential</h1>
          <p>
            Discover the best trails and connect with hikers around the world.
          </p>
          <div className="cta-buttons">
            <Link className='secondary-btn' to="/quiz">Take Your fitness assessment!</Link>
            <Link className="primary-btn" to="/sign-up">Sign Up</Link>
            <button className="secondary-btn">Browse Trails</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
