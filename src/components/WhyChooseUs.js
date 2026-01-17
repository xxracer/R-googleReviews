import React from 'react';
import './WhyChooseUs.css';

const reasons = [
  'Practical self-defense skills designed for all ages and abilities.',
  'Fitness programs to build lean strength and improve endurance.',
  'Confidence and discipline development for success on and off the mats.',
  'Family-owned academy with a supportive community environment.'
];

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us-section">
      <h2 className="section-title">Why Choose Reign Jiu Jitsu in Katy?</h2>
      <div className="why-choose-us-list">
        {reasons.map((reason, index) => (
          <div key={index} className="why-choose-us-item">
            <p>{reason}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;