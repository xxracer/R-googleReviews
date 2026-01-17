import React from 'react';
import './GoogleReviewsButton.css';

const GoogleReviewsButton = () => {
  const handleScrollToTestimonials = () => {
    const testimonialsSection = document.getElementById('testimonials-section');
    if (testimonialsSection) {
      testimonialsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button className="google-reviews-button" onClick={handleScrollToTestimonials}>
      <img
        src="https://static.wixstatic.com/media/c5947c_9a7f167bc24a48f2b049b879d1cd9f66~mv2.png"
        alt="Google Reviews"
      />
    </button>
  );
};

export default GoogleReviewsButton;