import React from 'react';
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Feed from './Pages/Feed';
import PrivateRoute from './Components/PrivateRoute';
import PublicRoute from './Components/PublicRoute';
import {BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() { 
  return (
    <GoogleOAuthProvider clientId="880107686540-heu6lab3s3tenocp3vv8vj72ijigkkim.apps.googleusercontent.com">
    <div className="App">
      <Router>

        <Routes>
          <Route
            path="/login"
            element={<PublicRoute element={<Login/>}/>}
          />
          <Route
            path="/signup"
            element={<PublicRoute element={<Signup/>}/>}
          />

          <Route
            path="/"
            element={<PrivateRoute element={<Feed/>}/>}
          />
           <Route
            path="/home"
            element={<PrivateRoute element={<Home/>}/>}
          />

        </Routes>
      </Router>
    </div>
    </GoogleOAuthProvider>
  );
}

export default App;