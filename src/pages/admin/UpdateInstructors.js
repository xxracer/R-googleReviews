
import React, { useState, useEffect } from 'react';
import './UpdateInstructors.css';

const API_URL = '/api/instructors';

const UpdateInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [formData, setFormData] = useState({ name: '', bio: '', image: '' });
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('image', file);

    fetch('/api/upload', {
      method: 'POST',
      body: uploadFormData,
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFormData({ ...formData, image: data.url });
        } else {
          console.error('Upload failed:', data.message);
        }
        setUploading(false);
      })
      .catch(err => {
        console.error('Error uploading file:', err);
        setUploading(false);
      });
  };

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setInstructors(data))
      .catch(err => console.error("Error fetching instructors:", err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(updatedOrNewInstructor => {
        if (editingId) {
          setInstructors(instructors.map(i => i.id === editingId ? updatedOrNewInstructor : i));
        } else {
          setInstructors([...instructors, updatedOrNewInstructor]);
        }
        resetForm();
      })
      .catch(err => console.error("Error saving instructor:", err));
  };

  const handleEdit = (instructor) => {
    setEditingId(instructor.id);
    setFormData({ name: instructor.name, bio: instructor.bio, image: instructor.image });
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => {
        setInstructors(instructors.filter(i => i.id !== id));
      })
      .catch(err => console.error("Error deleting instructor:", err));
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ name: '', bio: '', image: '' });
  };

  return (
    <div className="admin-container">
      <h1>Manage Instructors</h1>
      <div className="admin-form-card">
        <h2>{editingId ? 'Edit Instructor' : 'Add New Instructor'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Instructor Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="bio"
            placeholder="Instructor Bio"
            value={formData.bio}
            onChange={handleInputChange}
            rows="10"
          ></textarea>
          <div className="image-upload-container">
            <label htmlFor="image-upload">Instructor Image:</label>
            <input
              id="image-upload"
              type="file"
              name="imageFile"
              onChange={handleFileChange}
              accept="image/jpeg, image/png"
            />
            {uploading && <p>Uploading...</p>}
            {formData.image && (
              <div className="image-preview">
                <p>Current Image:</p>
                <img src={formData.image} alt="Instructor Preview" style={{ maxWidth: '100px' }} />
              </div>
            )}
          </div>
          <div className="form-buttons">
            <button type="submit">{editingId ? 'Update Instructor' : 'Add Instructor'}</button>
            {editingId && <button type="button" onClick={resetForm} className="cancel-btn">Cancel</button>}
          </div>
        </form>
      </div>

      <div className="instructors-list-container">
        <h2>Current Instructors</h2>
        <div className="instructors-list">
          {instructors.map(instructor => (
            <div key={instructor.id} className="instructor-list-item">
              <img src={instructor.image} alt={instructor.name} className="instructor-list-image" />
              <span className="instructor-list-name">{instructor.name}</span>
              <div className="instructor-list-actions">
                <button onClick={() => handleEdit(instructor)}>Edit</button>
                <button onClick={() => handleDelete(instructor.id)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpdateInstructors;
