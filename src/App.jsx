import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
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
import SupplierManagementPage from './pages/admin/SupplierManagementPage';
import AddSupplierPage from './pages/admin/AddSupplierPage';
import EditSupplierPage from './pages/admin/EditSupplierPage';
import SuppilerInfomationPage from './pages/admin/SuppilerInfomationPage';
import DrugManagementPage from './pages/admin/DrugManagementPage';
import AddDrugPage from './pages/admin/AddDrugPage';
import EditDrugPage from './pages/admin/EditDrugPage';
import DrugInformationPage from './pages/admin/DrugInformationPage';

const App = () => {
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
                        <Route path="/admin/appointments" element={<AppointmentManagement />} />
                        <Route path="/admin/suppliers" exact element={<SupplierManagementPage />} />
                        <Route path="/admin/supplier/add" element={<AddSupplierPage />} />
                        <Route path="/admin/supplier/edit/:id" element={<EditSupplierPage />} />
                        <Route path="/admin/supplier/:id" element={<SuppilerInfomationPage />} />
                        <Route path="/admin/drugs/" exact element={<DrugManagementPage />} />
                        <Route path="/admin/drug/add" element={<AddDrugPage />} />
                        <Route path="/admin/drug/edit/:id" element={<EditDrugPage />} />
                        <Route path="/admin/drug/:id" element={<DrugInformationPage />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
            
        </div>
    );
};

export default App;
