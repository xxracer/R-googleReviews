import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Testimonials.css';
import axios from 'axios';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/google-reviews');
        if (response.data.success && response.data.reviews) {
          // Serialize API data to match component structure
          const formattedReviews = response.data.reviews.map((r, index) => ({
            id: index,
            quote: r.text.length > 200 ? r.text.substring(0, 200) + '...' : r.text, // Truncate long reviews
            author: r.author_name,
            photo: r.profile_photo_url,
            rating: r.rating
          }));
          setReviews(formattedReviews);
        }
      } catch (error) {
        console.error('Error fetching Google reviews:', error);
        // Fallback or leave empty
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  if (loading) {
    return <div className="testimonials-section"><p>Loading reviews...</p></div>;
  }

  // Use fetching reviews if available, otherwise hide section or show fallback
  // For now, we only show if we have reviews.
  if (reviews.length === 0) {
    return null;
  }

  return (
    <section id="testimonials-section" className="testimonials-section">
      <h2 className="section-title">What Our Members Say (Powered by Google)</h2>
      <div className="testimonials-container">
        <Slider {...settings}>
          {reviews.map(review => (
            <div key={review.id}>
              <div className="testimonial-card">
                {/* Optional: Show profile photo if desired */}
                {review.photo && <img src={review.photo} alt={review.author} className="testimonial-photo" />}
                <p className="testimonial-quote">“{review.quote}”</p>
                <p className="testimonial-author">— {review.author}</p>
                <div className="testimonial-rating">{'⭐'.repeat(review.rating)}</div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;