import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ element,}) => {
 
    const isAuthenticated = localStorage.getItem("authToken") ? true : false;
    return isAuthenticated?( 
    <Navigate to="/" replace/>
    ):(
      element   
  );
};

export default PublicRoute;

