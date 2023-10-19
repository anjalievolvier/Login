import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PublicRoute = ({ element: Element, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Navigate to="/home" /> : <Element />}
      ></Route>
  );
};

export default PublicRoute;

