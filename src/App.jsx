import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Header from './components/layout/Header';
import Contact_Page from './components/Contact_Page';
import My_Appointments_Page from './components/My_Appointments_Page';

const App = () => {
    return (
        <div>
            <Header/>
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/contact" element={<Contact_Page />} />
                <Route path="/me/my-appointments" element={<My_Appointments_Page />} />
            </Routes>
        </Router>
        </div>
    );
};

export default App;
