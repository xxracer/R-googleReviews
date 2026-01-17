
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImageEditor.css'; // Reuse styles

const VideoEditor = ({ sectionId, title }) => {
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const apiBaseUrl = ''; // All API calls will be proxied

  useEffect(() => {
    const fetchCurrentVideo = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/content/${sectionId}`);
        if (response.data && response.data.content_value) {
          setCurrentVideoUrl(response.data.content_value);
          setNewVideoUrl(response.data.content_value);
        }
      } catch (error) {
        if (error.response && error.response.status !== 404) {
          console.error(`Error fetching content for ${sectionId}:`, error);
          setStatusMessage('Could not load current video URL.');
          setMessageType('error');
        }
      }
    };
    fetchCurrentVideo();
  }, [sectionId, apiBaseUrl]);

  const handleSave = async () => {
    if (!newVideoUrl) {
      setStatusMessage('Please enter a video URL.');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setStatusMessage('Saving...');
    setMessageType('');

    try {
      await axios.put(`${apiBaseUrl}/api/content/${sectionId}`, {
        content_type: 'video_url',
        content_value: newVideoUrl,
      });

      setCurrentVideoUrl(newVideoUrl);
      setStatusMessage('Video URL updated successfully!');
      setMessageType('success');
    } catch (error) {
      console.error('Failed to update video URL:', error);
      setStatusMessage('An error occurred. Please try again.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="image-editor">
      <h3>{title}</h3>
      {currentVideoUrl && (
        <div className="video-preview">
          <p>Current Video:</p>
          <iframe
            width="560"
            height="315"
            src={currentVideoUrl.replace('watch?v=', 'embed/')}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <div className="upload-controls">
        <input
          type="text"
          value={newVideoUrl}
          onChange={(e) => setNewVideoUrl(e.target.value)}
          placeholder="Enter new YouTube URL"
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <button className="btn" onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save New Video URL'}
        </button>
      </div>
      {statusMessage && (
        <p className={`status-message ${messageType}`}>
          {statusMessage}
        </p>
      )}
    </div>
  );
};

export default VideoEditor;
