import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ProductTypes from './Pages/ProductTypes';
import Items from './Pages/Items';
import ProtectedRoute from './ProtectedRoute';
import WebFont from "webfontloader";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Muli"],
      },
    });
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/login"
          element={<Login />}
        />
        <Route
          exact
          path="/signup"
          element={<Signup />}
        />
        <Route
          exact
          path="*"
          element={
            <ProtectedRoute>
              <ProductTypes />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/items"
          element={
            <ProtectedRoute>
              <Items />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
