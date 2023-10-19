import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, isAuthenticated, ...rest }) => {
  return (
    <Outlet
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/" />}
    />
  );
};

export default PrivateRoute;

