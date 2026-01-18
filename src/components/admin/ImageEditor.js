
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import ImageLibrary from './ImageLibrary'; // Import the new component
import './ImageEditor.css';

const ImageEditor = ({ sectionId, title, showPositionControl = false }) => {
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false); // State for modal
  const [objectPosition, setObjectPosition] = useState('center');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [postLink, setPostLink] = useState(''); // New state for linking images
  const nodeRef = React.useRef(null); // Fix for React 19 findDOMNode deprecation

  const apiBaseUrl = ''; // All API calls will be proxied

  useEffect(() => {
    const fetchCurrentImage = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/content/${sectionId}`);
        if (response.data && response.data.content_value) {
          const content = JSON.parse(response.data.content_value);
          setCurrentImageUrl(content.url);
          if (content.position) {
            setObjectPosition(content.position);
          }
          if (content.coords) {
            setPosition(content.coords);
          }
          if (content.postLink) {
            setPostLink(content.postLink);
          }
        }
      } catch (error) {
        if (error.response && error.response.status !== 404) {
          console.error(`Error fetching content for ${sectionId}:`, error);
          setStatusMessage('Could not load current image.');
          setMessageType('error');
        }
      }
    };
    fetchCurrentImage();
  }, [sectionId, apiBaseUrl]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setStatusMessage('');
  };

  const handlePositionChange = (event) => {
    setObjectPosition(event.target.value);
  };

  const handleDrag = (e, ui) => {
    const { x, y } = position;
    setPosition({ x: x + ui.deltaX, y: y + ui.deltaY });
  };

  const handleSave = async () => {
    setIsLoading(true);
    setStatusMessage('Saving...');
    setMessageType('');

    let imageUrl = currentImageUrl;

    try {
      if (selectedFile) {
        setStatusMessage('Uploading image...');
        const formData = new FormData();
        formData.append('image', selectedFile);
        const uploadResponse = await axios.post(`${apiBaseUrl}/api/upload`, formData);
        imageUrl = uploadResponse.data.url;
      }

      if (!imageUrl) {
        setStatusMessage('Please select an image file first.');
        setMessageType('error');
        setIsLoading(false);
        return;
      }

      setStatusMessage('Saving content...');
      const contentToSave = {
        url: imageUrl,
        position: objectPosition,
        coords: position,
        postLink: postLink,
      };

      await axios.put(`${apiBaseUrl}/api/content/${sectionId}`, {
        content_type: 'image_details',
        content_value: JSON.stringify(contentToSave),
      });

      setCurrentImageUrl(imageUrl);
      setStatusMessage('Image updated successfully!');
      setMessageType('success');
      setSelectedFile(null);
    } catch (error) {
      console.error('Failed to update image:', error);
      setStatusMessage('An error occurred. Please try again.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectFromLibrary = (imageUrl) => {
    setCurrentImageUrl(imageUrl);
    setSelectedFile(null); // Clear any selected file
    setStatusMessage('Image selected from library. Click "Save Changes" to apply.');
    setMessageType('info');
    setIsLibraryOpen(false); // Close the modal
  };

  return (
    <div className="image-editor">
      {isLibraryOpen && (
        <ImageLibrary
          onSelect={handleSelectFromLibrary}
          onClose={() => setIsLibraryOpen(false)}
        />
      )}
      <h3>{title}</h3>
      <div className="image-preview draggable-container">
        <p>Current Image (Drag to reposition):</p>
        {currentImageUrl ? (
          <Draggable nodeRef={nodeRef} onDrag={handleDrag} defaultPosition={position}>
            <img ref={nodeRef} src={currentImageUrl} alt={title} style={{ objectPosition: objectPosition }} />
          </Draggable>
        ) : (
          <div className="no-image-placeholder">No Image Selected</div>
        )}
      </div>
      <div className="upload-controls">
        <input type="file" onChange={handleFileChange} accept="image/*,image/gif" />
        <button className="btn" onClick={() => setIsLibraryOpen(true)}>Choose from Library</button>
        {showPositionControl && (
          <select value={objectPosition} onChange={handlePositionChange}>
            <option value="center">Center</option>
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        )}
        <button className="btn" onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
      {(sectionId.includes('instagram') || sectionId.includes('program') || sectionId.includes('link')) && (
        <div className="link-controls" style={{ marginTop: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Destination Link (Optional):</label>
          <input
            type="text"
            placeholder="https://instagram.com/p/..."
            value={postLink}
            onChange={(e) => setPostLink(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
      )}
      {statusMessage && <p className={`status-message ${messageType}`}>{statusMessage}</p>}
    </div>
  );
};

export default ImageEditor;
