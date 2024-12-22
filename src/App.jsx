import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Contact_Page from './page/ContactPage';
import My_Appointments_Page from './page/MyAppointmentsPage';
import Home_Page from './page/HomePage';
import DoctorsPage from './page/DoctorsPage';
import AboutPage from './page/AboutPage';
import AppointmentPage from './page/AppointmentPage';

import Layout from './layout';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home_Page />} />
                        <Route path="/contact" element={<Contact_Page />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/all-doctors" element={<DoctorsPage />} />
                        <Route path="/me/my-appointments" element={<My_Appointments_Page />} />
                        <Route path="/appointment/:id" element={<AppointmentPage />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
            
        </div>
    );
};

export default App;
