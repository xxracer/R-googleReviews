
import React, { useState } from 'react';
import axios from 'axios';
import './ChangePasswordPage.css';

const ChangePasswordPage = () => {
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    try {
      const response = await axios.post('/api/change-password', {
        securityAnswer,
        newPassword,
      });
      setMessage(response.data.message);
      setMessageType('success');
      setSecurityAnswer('');
      setNewPassword('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred.');
      setMessageType('error');
    }
  };

  return (
    <div className="change-password-container">
      <h1>Change Admin Password</h1>
      <form className="change-password-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Security Question</label>
          <input type="text" value="bjj" readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="security-answer">Your Answer</label>
          <input
            type="text"
            id="security-answer"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="new-password">New Password</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password-btn"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <button type="submit">Change Password</button>
        {message && <p className={`message ${messageType}`}>{message}</p>}
      </form>
    </div>
  );
};

export default ChangePasswordPage;
