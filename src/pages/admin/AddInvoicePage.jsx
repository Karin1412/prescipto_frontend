import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuOptions from '../../components/layout/MenuOptions';
import { menuOptions } from '../../data/menuOptionsData';
import useMenuOptionHandler from '../../components/layout/menuOptionHandlers';
import invoiceData from '../../data/invoiceData';
import LargeRoundedCornerButton from "../../components/layout/LargeRoundedCornerButton";

const AddInvoicePage = () => {
  const [patientName, setPatientName] = useState("");
  const [serviceDetails, setServiceDetails] = useState(""); // Added setter for serviceDetails
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [activeOption, setActiveOption] = useState("invoices");
  const uniquePatientNames = [...new Set(invoiceData.map((invoice) => invoice.patientName))];

  const VAT = 100000;

  const { handleOptionClick } = useMenuOptionHandler(setActiveOption);
  const navigate = useNavigate();

  const handleCreateInvoice = () => {
    // Optional: Store the success message in session storage or navigate to the list of invoices
    sessionStorage.setItem("invoiceSuccessMessage", "Hóa đơn đã được tạo thành công!");
    navigate('/admin/invoice'); // Navigating to invoice list page
  };

  const calculateTotal = () => {
    const discountAmount = (discount / 100) * subtotal;
    const totalBeforeVAT = subtotal - discountAmount + VAT;
    return totalBeforeVAT;
  };

  return (
    <div className="flex flex-row gap-5 mt-7 font-sans">
      <div className="w-1/6 ml-6">
        {/* MenuOptions on the left */}
        <MenuOptions
          options={menuOptions}
          activeOption={activeOption}
          onOptionClick={handleOptionClick}
        />
      </div>

      <div className="w-5/6 mr-6">
        <div className="flex justify-between items-center mt-5">
          <span className="uppercase font-medium text-2xl text-[#2A2A2A] mb-7 font-raleway">
            TẠO HÓA ĐƠN
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block font-semibold mb-1">Mã hóa đơn:</label>
              <input
                type="text"
                value="HD001" // Static ID for now, can be generated dynamically later
                disabled
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>
            <div className="flex-1">
              <label className="block font-semibold mb-1">Tên bệnh nhân:</label>
              <input
                type="text"
                placeholder="Nhập tên bệnh nhân"
                className="w-full p-2 border rounded-md"
                onChange={(e) => setPatientName(e.target.value)}
                value={patientName}
                list="patient-list"
              />
              <datalist id="patient-list">
                {uniquePatientNames.map((name, index) => (
                  <option key={index} value={name} />
                ))}
              </datalist>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Chi tiết dịch vụ:</label>
            <textarea
              placeholder="Nhập chi tiết dịch vụ"
              className="w-full p-2 border rounded-md"
              onChange={(e) => setServiceDetails(e.target.value)} // Update state
              value={serviceDetails}
            ></textarea>
          </div>

          <div className="flex flex-col items-end space-y-4 w-1/3 max-w-md ml-auto">
            {/* Tạm tính */}
            <div className="flex items-center w-full">
              <label className="flex-none w-1/4 font-semibold text-left mr-2">Tạm tính:</label>
              <input
                type="number"
                placeholder="Nhập tiền tạm tính"
                className="flex-1 p-2 border rounded-md text-right"
                value={subtotal}
                onChange={(e) => setSubtotal(Number(e.target.value))}
              />
              <span className="w-10 text-right ml-2">VNĐ</span>
            </div>

            {/* Giảm giá */}
            <div className="flex items-center w-full">
              <label className="flex-none w-1/4 font-semibold text-left mr-2">Giảm giá:</label>
              <input
                type="number"
                placeholder="Nhập % giảm giá"
                className="flex-1 p-2 border rounded-md text-right"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
              />
              <span className="w-10 text-right ml-2">%</span>
            </div>

            {/* VAT */}
            <div className="flex items-center w-full">
              <label className="flex-none w-1/4 font-semibold text-left mr-2">VAT:</label>
              <span className="flex-1 text-right">{VAT.toLocaleString()} VNĐ</span>
            </div>

            {/* Tổng */}
            <div className="flex items-center w-full">
              <label className="flex-none w-1/4 font-semibold text-left mr-2">Tổng:</label>
              <span className="flex-1 text-right font-bold">
                {calculateTotal().toLocaleString()} VNĐ
              </span>
            </div>

            {/* Nút tạo hóa đơn */}
            <LargeRoundedCornerButton
              className="large-rounded-corner-button py-1 px-5 ml-auto"
              text="Tạo hóa đơn mới"
              variant="primary"
              onClick={handleCreateInvoice}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInvoicePage;
