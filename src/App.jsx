import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Contact_Page from './pages/patient/ContactPage';
import My_Appointments_Page from './pages/patient/MyAppointmentsPage';
import Home_Page from './pages/patient//HomePage';
import DoctorsPage from './pages/patient/DoctorsPage';
import AboutPage from './pages/patient/AboutPage';
import AppointmentPage from './pages/patient/AppointmentPage';
import AddInvoicePage from './pages/admin/AddInvoicePage';
import InvoiceManagementPage from './pages/admin/InvoiceManagementPage';
import Layout from './layout';
import { ToastContainer } from 'react-toastify';
import UserManagementPage from './pages/admin/UserManagementPage';
import AddUserPage from './pages/admin/AddUserPage';
import UpdateUserPage from './pages/admin/UpdateUserPage';
import UserInfoPage from './pages/admin/UserInfoPage';
import InvoiceInfoPage from './pages/admin/InvoiceInfoPage';
import InventoryReportPage from './pages/admin/InventoryReportPage';


const App = () => {
    return (
        <div>
            <BrowserRouter>
            <ToastContainer />
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
                    <Route path="/admin/invoice/add" element={<AddInvoicePage />} />
                    <Route path="/admin/invoice" exact element={<InvoiceManagementPage />} />
                    <Route path="/admin/user" exact element={<UserManagementPage />} />
                    <Route path="/admin/user/add" exact element={<AddUserPage />} />
                    <Route path="/admin/user/edit/:userId" exact element={<UpdateUserPage />} />
                    <Route path="/admin/user/:userID" exact element={<UserInfoPage />} />
                    <Route path="/admin/invoice/:invoiceID" exact element={<InvoiceInfoPage />} />
                    <Route path="/admin/report" exact element={<InventoryReportPage />} />
                </Routes>
            </BrowserRouter>
            
        </div>
    );
};

export default App;
