import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AboutPage from './components/AboutPage';
import Footer from './components/layout/Footer';
import DoctorsPage from './components/DoctorsPage';


const App = () => {
  return (
    <Router>
        <div>
      <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer/>
        </div>
    </Router>
  );
};

export default App;
