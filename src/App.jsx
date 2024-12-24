import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Contact_Page from './components/Contact_Page';
import My_Appointments_Page from './components/My_Appointments_Page';
import Home_Page from './components/Home_Page';
import DoctorsPage from './components/DoctorsPage';
import AboutPage from './components/AboutPage';
import Layout from './layout';

const App = () => {
    const isAuthenticated = localStorage.getItem('token');
    return (
        <BrowserRouter>
            <Routes>
                {/* Routes chính được bao bởi Layout */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home_Page />} />
                    <Route path="/contact" element={<Contact_Page />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/all-doctors" element={<DoctorsPage />} />
                    <Route path="/me/my-appointments" element={<My_Appointments_Page />} />
                </Route>

                {/* Routes dành cho login và register */}
                <Route path="/login" element={isAuthenticated ? <Home_Page /> : <Login />} />
                <Route path="/register" element={isAuthenticated ? <Home_Page /> : <Register />} />

            </Routes>
        </BrowserRouter>
    );
};

export default App;
