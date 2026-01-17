import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WelcomeSection.css';

const WelcomeSection = () => {
  const [imageUrl, setImageUrl] = useState('https://static.wixstatic.com/media/c5947c_bf5a3cd828194df2944c8bb4eaf4cae0~mv2.jpg');
  const apiBaseUrl = ''; // All API calls will be proxied

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/content/welcome_section_image`);
        if (response.data && response.data.content_value) {
          setImageUrl(response.data.content_value);
        }
      } catch (error) {
        console.error('Error fetching welcome section image:', error);
      }
    };
    fetchImage();
  }, [apiBaseUrl]);

  return (
    <section id="welcome-section" className="welcome-section">
      <div className="welcome-container">
        <div className="welcome-text-content">
          <p className="welcome-seo-text">
            Reign Jiu-Jitsu is home to multiple youth champions and one of the nation’s most respected teams. Whether you’re a beginner, competitor, or parent looking for a family-friendly program, our world-class facility combines elite training, a full gym, and a positive culture built to help you grow.
          </p>
          <p className="welcome-seo-text">
            From kids to adults, beginners to competitors, our students develop strength, discipline, and confidence through Brazilian Jiu-Jitsu. We’re home to multiple youth champions and one of the nation’s most respected competition teams, offering:
          </p>
          <ul className="welcome-list">
            <li>✅ Competition Training for serious athletes</li>
            <li>✅ Homeschool Jiu-Jitsu Program for growing minds and bodies</li>
            <li>✅ Fundamentals for Beginners to build a solid foundation</li>
            <li>✅ Adult Gi & No-Gi Classes in a motivating, inclusive environment</li>
          </ul>
          <p className="welcome-seo-text">
            Scroll down to explore why Reign Jiu-Jitsu is recognized among the best in the World.
          </p>
          <button className="welcome-info-button">Get more info</button>
        </div>
        <div className="welcome-image-wrapper">
          <img src={imageUrl} alt="Group of mixed-age students on the mats" />
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;