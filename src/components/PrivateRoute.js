
import React from 'react';
import { Outlet } from 'react-router-dom';

// PrivateRoute simplified to allow access to admin routes (login removed)
// If you later want to re-enable auth, restore the original behavior and
// pass an `isAuthenticated` prop from top-level state.
const PrivateRoute = ({ children }) => {
  return children ? children : <Outlet />;
};

export default PrivateRoute;
