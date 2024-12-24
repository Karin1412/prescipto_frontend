import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Header from './components/layout/Header';
import ContactPage from './pages/patient/ContactPage';
import MyAppointmentsPage from './pages/patient/MyAppointmentsPage';
import HomePage from './pages/patient/HomePage';
import DoctorsPage from './pages/patient/DoctorsPage';
import AboutPage from './pages/patient/AboutPage';

import Layout from './layout';
import AppointmentManagement from './pages/admin/AppointmentManagement';

const App = () => {
    const isAuthenticated = localStorage.getItem('token');
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/all-doctors" element={<DoctorsPage />} />
                        <Route path="/me/my-appointments" element={<MyAppointmentsPage />} />
                        <Route path="/appointments" element={<AppointmentManagement />} />
                    </Route>
                    <Route path="/login" element={isAuthenticated ? <HomePage /> : <Login />} />
                    <Route path="/register" element={isAuthenticated ? <HomePage /> : <Register />} />

                </Routes>
            </BrowserRouter>
            
        </div>
    );
};

export default App;
