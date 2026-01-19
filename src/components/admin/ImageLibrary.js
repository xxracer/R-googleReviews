
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImageLibrary.css';

const ImageLibrary = ({ onSelect, onClose }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('/api/images');
        setImages(response.data);
      } catch (err) {
        setError('Failed to load images.');
        console.error('Error fetching images:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const handleImageSelect = (imageUrl) => {
    onSelect(imageUrl);
  };

  const handleDelete = async (imageId, event) => {
    event.stopPropagation();
    const confirmed = window.confirm('Delete this image? This cannot be undone.');
    if (!confirmed) return;

    try {
      await axios.delete(`/api/images/${imageId}`);
      setImages(prev => prev.filter(image => image.id !== imageId));
    } catch (err) {
      console.error('Error deleting image:', err);
      setError('Failed to delete image. Please try again.');
    }
  };

  return (
    <div className="image-library-modal-backdrop">
      <div className="image-library-modal-content">
        <div className="image-library-header">
          <h2>Image Library</h2>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>
        <div className="image-grid">
          {loading && <p>Loading images...</p>}
          {error && <p className="error-message">{error}</p>}
          {images.map(image => (
            <div key={image.id} className="image-thumbnail" onClick={() => handleImageSelect(image.image_url)}>
              <img src={image.thumb_url || image.image_url} alt={`Library item ${image.id}`} />
              <button
                type="button"
                className="delete-image-button"
                onClick={(event) => handleDelete(image.id, event)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageLibrary;
