import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Admin Panel</h2>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
        <ul>
          <li>
            <NavLink to="/admin/homepage" className={({ isActive }) => isActive ? 'active' : ''}>
              Manage Homepage
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/programs" className={({ isActive }) => isActive ? 'active' : ''}>
              Manage Programs
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/about" className={({ isActive }) => isActive ? 'active' : ''}>
              Manage About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/instructors" className={({ isActive }) => isActive ? 'active' : ''}>
              Manage Instructors
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/security" className={({ isActive }) => isActive ? 'active' : ''}>
              Change Password
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
