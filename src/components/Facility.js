import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Facility.css';

const initialFacilityImages = [
  { src: 'https://static.wixstatic.com/media/c5947c_34e1a84bb98841e3aff3467d7ed9dc04~mv2.png', alt: 'Wide shot of facility interior' },
  { src: 'https://static.wixstatic.com/media/c5947c_34137efc570a49c89501d43f8410a291~mv2.png', alt: 'Clean locker rooms / training equipment' }
];

const Facility = () => {
  const [facilityImages, setFacilityImages] = useState(initialFacilityImages);
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/0zh97sdP8-k');
  const apiBaseUrl = ''; // All API calls will be proxied

  useEffect(() => {
    const fetchFacilityContent = async () => {
      try {
        const [image1Res, image2Res, videoRes] = await Promise.all([
          axios.get(`${apiBaseUrl}/api/content/facility_image_1`),
          axios.get(`${apiBaseUrl}/api/content/facility_image_2`),
          axios.get(`${apiBaseUrl}/api/content/facility_video`)
        ]);

        if (image1Res.data && image1Res.data.content_value) {
          setFacilityImages(prev => [{ ...prev[0], src: image1Res.data.content_value }, prev[1]]);
        }
        if (image2Res.data && image2Res.data.content_value) {
          setFacilityImages(prev => [prev[0], { ...prev[1], src: image2Res.data.content_value }]);
        }
        if (videoRes.data && videoRes.data.content_value) {
          setVideoUrl(videoRes.data.content_value.replace('watch?v=', 'embed/'));
        }
      } catch (error) {
        console.error('Error fetching facility content:', error);
      }
    };
    fetchFacilityContent();
  }, [apiBaseUrl]);

  return (
    <section id="facility" className="facility-section">
      <h2 className="section-title">Our Facility</h2>
      <p className="facility-description">
        Our modern facility provides everything you need for safe and effective training. With competition-quality mats, spacious training areas, and a clean environment, we are more than a Jiu Jitsu studio near me – we are a sports performance gym in Katy, TX, designed to help you grow physically and mentally.
      </p>
      <div className="facility-image-grid">
        {facilityImages.map((image, index) => (
          <div key={index} className="facility-image-item">
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
      <div className="facility-video-wrapper">
        <div className="facility-video">
          <iframe
            src={videoUrl}
            title="Reign Jiu Jitsu Facility Tour"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Facility;
