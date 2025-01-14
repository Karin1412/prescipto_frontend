import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Contact_Page from './pages/patient/ContactPage';
import My_Appointments_Page from './pages/patient/MyAppointmentsPage';
import Home_Page from './pages/patient/HomePage';
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
import PatientProfilePage from './pages/patient/PatientProfilePage';
import { patientData, testResultsData } from './data/PatientProfileData';
import SupplierManagementPage from './pages/admin/SupplierManagementPage';
import AddSupplierPage from './pages/admin/AddSupplierPage';
import EditSupplierPage from './pages/admin/EditSupplierPage';
import SuppilerInfomationPage from './pages/admin/SuppilerInfomationPage';
import AppointmentManagement from './pages/admin/AppointmentManagement';
import MedicineManagementPage from './pages/admin/MedicineManagementPage';
import AddMedicinePage from './pages/admin/AddMedicinePage';
import EditMedicinePage from './pages/admin/EditMedicinePage';
import MedicineInformationPage from './pages/admin/MedicineInformationPage';
import GoodsReceiptNoteManagementPage from './pages/admin/GoodsReceiptNoteManagementPage';
import GoodsReceiptNoteInformationPage from './pages/admin/GoodsReceiptNoteInformationPage';
import AddMedicineToGoodsReceiptNotePage from './pages/admin/AddMedicineToGoodsReceiptNotePage';
import AddGoodsReceiptNotePage from './pages/admin/AddGoodsReceiptNotePage';
import DoctorManagementPage from './pages/admin/DoctorManagement';

const App = () => {
    const isAuthenticated = !!localStorage.getItem('token');
    return (
        <div>
            <BrowserRouter>
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home_Page />} />
                        <Route path="contact" element={<Contact_Page />} />
                        <Route path="about" element={<AboutPage />} />
                        <Route path="all-doctors" element={<DoctorsPage />} />
                        <Route path="me/my-appointments" element={<My_Appointments_Page />} />
                        <Route path="appointment/:id" element={<AppointmentPage />} />
                        <Route path="me/profile" element={<PatientProfilePage patient={patientData} testResults={testResultsData}/>} />
                    </Route>

                    <Route path="/login" element={isAuthenticated ? <Home_Page /> : <Login />} />
                    <Route path="/register" element={isAuthenticated ? <Home_Page /> : <Register />} />

                    <Route path="/admin/report" element={<InventoryReportPage />}/>
                    <Route path="/admin/invoice/add" element={<AddInvoicePage />} />
                    <Route path="/admin/invoice" exact element={<InvoiceManagementPage />} />
                    <Route path="/admin/user" exact element={<UserManagementPage />} />
                    <Route path="/admin/user/add" exact element={<AddUserPage />} />
                    <Route path="/admin/user/edit/:userId" exact element={<UpdateUserPage />} />
                    <Route path="/admin/user/:userID" exact element={<UserInfoPage />} />
                    <Route path="/admin/invoice/:invoiceID" exact element={<InvoiceInfoPage />} />
                    <Route path="/admin/appointments" element={<AppointmentManagement />} />
                    <Route path="/admin/suppliers" exact element={<SupplierManagementPage />} />
                    <Route path="/admin/supplier/add" element={<AddSupplierPage />} />
                    <Route path="/admin/supplier/edit/:id" element={<EditSupplierPage />} />
                    <Route path="/admin/supplier/:id" element={<SuppilerInfomationPage />} />
                    <Route path="/admin/drugs/" exact element={<MedicineManagementPage />} />
                    <Route path="/admin/medicine/add" element={<AddMedicinePage />} />
                    <Route path="/admin/medicine/edit/:id" element={<EditMedicinePage />} />
                    <Route path="/admin/medicine/:id" element={<MedicineInformationPage />} />
                    <Route path="/admin/goods-receipt-notes" exact element={<GoodsReceiptNoteManagementPage />} />
                    <Route path="/admin/goods-receipt-note/:id" element={<GoodsReceiptNoteInformationPage />} />
                    <Route path="/admin/goods-receipt-note/add" element={<AddGoodsReceiptNotePage />} />
                    <Route path="/admin/goods-receipt-note/add/add-medicine" element={<AddMedicineToGoodsReceiptNotePage />} />
                    <Route path="/admin/doctor" exact element={<DoctorManagementPage />} />

                </Routes>

            </BrowserRouter>
        </div>
    );
};

export default App;
