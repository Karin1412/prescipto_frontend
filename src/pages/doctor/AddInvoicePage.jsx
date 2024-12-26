import React, { useState } from 'react'; 
import MenuOptions from '../../components/layout/MenuOptions'; // Correctly import the MenuOptions component
import '../../styles/AddInvoicePage.css'; // Correct CSS import
import invoiceData from '../../data/invoiceData'

const AddInvoicePage = () => {
  const [patientName, setPatientName] = useState("");
  const [serviceDetails, setServiceDetails] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [activeOption, setActiveOption] = useState("invoices");
  const VAT = 100000;

  const handleCreateInvoice = () => {
    alert("Hóa đơn đã được tạo!");
  };

  const handleOptionClick = (option) => {
    setActiveOption(option);
    console.log("Selected option:", option);
  };

  const calculateTotal = () => {
    const discountAmount = (subtotal * discount) / 100;
    return subtotal - discountAmount + VAT;
  };

  // Options for MenuOptions component
  const Options = [
    { label: 'Báo cáo thống kê', value: 'report' },
    { label: 'Quản lý lịch khám', value: 'appointments' },
    { label: 'Quản lý thuốc', value: 'medicines' },
    { label: 'Quản lý phiếu nhập kho', value: 'warehouse' },
    { label: 'Quản lý hóa đơn', value: 'invoices' },
    { label: 'Quản lý nhà cung cấp', value: 'suppliers' },
    { label: 'Quản lý người dùng', value: 'users' },
    { label: 'Đăng xuất', value: 'logout', logout: true },
  ];

  return (
    <div className="invoice-form-container">
      {/* MenuOptions component */}
      <MenuOptions
        options={Options}
        activeOption={activeOption}
        onOptionClick={handleOptionClick}
      />

      <div className="form-section">
        <h2>TẠO HÓA ĐƠN</h2>

        {/* Form Row for Mã hóa đơn, Tên bệnh nhân */}
        <div className="form-row">
          <div className="form-group">
            <label>Mã hóa đơn:</label>
            <input type="text" value="HĐ001" disabled />
          </div>

          <div className="form-group">
            <label>Tên bệnh nhân:</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Nhập tên bệnh nhân"
              list="patient-list"
            />
            <datalist id="patient-list">
              <option value="Bệnh nhân 1" />
              <option value="Bệnh nhân 2" />
              <option value="Bệnh nhân 3" />
            </datalist>
          </div>
        </div>

        {/* Form Group for Chi tiết dịch vụ */}
        <div className="form-group">
          <label>Chi tiết dịch vụ:</label>
          <textarea
            value={serviceDetails}
            onChange={(e) => setServiceDetails(e.target.value)}
            placeholder="Nhập chi tiết dịch vụ"
          ></textarea>
        </div>

        {/* Grouped fields for Tạm tính, Giảm giá, VAT (vertically aligned) */}
        <div className="form-row-right">
        <div className="form-group">
            <label>Tạm tính:</label>
            <input
                type="number"
                value={subtotal}
                onChange={(e) => setSubtotal(Number(e.target.value))}
                placeholder="Nhập tiền tạm tính"
            />
            <span className="input-unit">VNĐ</span>
            </div>

            <div className="form-group">
            <label>Giảm giá:</label>
            <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                placeholder="Nhập % giảm giá"
            />
            <span className="input-unit">%</span>
            </div>


            <div className="form-group">
                <label>VAT:</label>
                <span className="vat-display">{VAT.toLocaleString()} VNĐ</span>
            </div>

            <div className="form-group">
                <label>Tổng:</label>
                <span className="total">{calculateTotal().toLocaleString()} VNĐ</span>
            </div>
            
            <button className="create-button" onClick={handleCreateInvoice}>
                Tạo hóa đơn mới
            </button>
        </div>

        {/* Total Price */}
        

        {/* Create Invoice Button */}
        
      </div>
    </div>
  );
};

export default AddInvoicePage;
