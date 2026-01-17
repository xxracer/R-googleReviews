import React from 'react';
import './CallToAction.css';

const CallToAction = () => {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2 className="cta-title">Try Katy’s Favorite Jiu Jitsu Classes Today</h2>
        <p className="cta-text">
          Join athletes and families across Katy who trust Reign Jiu Jitsu for expert coaching
          and a positive learning environment. Take the first step today!
        </p>
        <a href="#contact" className="cta-button">Get More Info</a>
      </div>
    </section>
  );
};

export default CallToAction;