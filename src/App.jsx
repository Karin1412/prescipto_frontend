import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Header from './components/layout/Header';
import Contact_Page from './components/Contact_Page';
import My_Appointments_Page from './components/My_Appointments_Page';
import Home_Page from './components/Home_Page';
import Layout from './layout';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home_Page />} />
                        <Route path="/contact" element={<Contact_Page />} />
                        <Route path="/me/my-appointments" element={<My_Appointments_Page />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
            
        </div>
    );
};

export default App;
