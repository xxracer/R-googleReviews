import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProgramHero.css';

const ProgramHero = ({ title, sectionId, defaultImage }) => {
  const [heroImageUrl, setHeroImageUrl] = useState(defaultImage);
  const apiBaseUrl = ''; // All API calls will be proxied

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/content/${sectionId}`);
        if (response.data && response.data.content_value) {
          setHeroImageUrl(response.data.content_value);
        }
      } catch (error) {
        console.error(`Error fetching hero image for ${sectionId}:`, error);
        // If there's an error, the defaultImage will be used.
      }
    };
    fetchHeroImage();
  }, [sectionId, apiBaseUrl]);

  return (
    <section className="program-hero" style={{ backgroundImage: `url('${heroImageUrl}')` }}>
      <h1 className="program-hero-title">{title}</h1>
    </section>
  );
};

export default ProgramHero;
