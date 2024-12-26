import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MenuOptions from '../../components/layout/MenuOptions.jsx';
import invoiceData from '../../data/invoiceData';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import ItemActionButton from "../../components/layout/ItemActionButton";
import "../../styles/ItemActionButton.css";
import { menuOptions } from '../../data/menuOptionsData'; // Import menuOptions từ file riêng
import useMenuOptionHandler from '../../components/layout/menuOptionHandlers'; // Import custom hook
import LargeRoundedCornerButton from "../../components/layout/LargeRoundedCornerButton";
import "../../styles/LargeRoundedCornerButton.css";

const InvoiceManagementPage = () => {
  const [invoices] = useState(invoiceData); // Dữ liệu hóa đơn giả lập
  const [searchQuery, setSearchQuery] = useState('');
  const [activeOption, setActiveOption] = useState('invoices');

  const { handleOptionClick } = useMenuOptionHandler(setActiveOption);

  const columnDefs = [
    {
      headerName: "Mã hóa đơn",
      field: "code",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "flex items-center justify-center", // Căn giữa
    },
    {
      headerName: "Tên bệnh nhân",
      field: "patientName",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "flex items-center justify-center", // Căn giữa
    },
    {
      headerName: "Ngày lập",
      field: "date",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "flex items-center justify-center", // Căn giữa
    },
    {
      headerName: "Trạng thái",
      field: "status",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "flex items-center justify-center", // Căn giữa
      cellStyle: (params) => {
        let color;
        switch (params.value) {
          case "Đã thanh toán":
            color = "#4CAF50"; // Màu xanh cho đã thanh toán
            break;
          case "Chưa thanh toán":
            color = "#FF5722"; // Màu cam cho chưa thanh toán
            break;
          default:
            color = "black";
        }
        return { color }; // Thay đổi màu chữ theo trạng thái
      },
    },
    {
      headerName: "Hành động",
      field: "id",
      minWidth: 150,
      cellRenderer: (params) => (
        <Link to={`/doctor/invoice/${params.value}`}>
          <ItemActionButton
            img="/src/assets/Information Circle Contained.svg"
            variant="primary"
            className="item-action-button h-6 w-6 m-2 p-1"
          />
        </Link>
      ),
      cellClass: "flex items-center justify-center", // Căn giữa
    },
  ];

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.code.includes(searchQuery) ||
      invoice.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-row gap-5 mt-7">
      <div className="w-1/6 ml-6">
        {/* MenuOptions bên trái */}
        <MenuOptions
          options={menuOptions}
          activeOption={activeOption}
          onOptionClick={handleOptionClick}
        />
      </div>

      <div className="w-5/6 mr-6">

        <div className="flex justify-between items-center mt-10">
        {/* Tiêu đề "Danh sách hóa đơn" */}
        <span className="uppercase font-medium text-2xl text-[#2A2A2A] mb-7 font-raleway">
            Danh sách Hóa đơn
        </span>
        </div>

        <div className="flex justify-between items-center mb-4">
        <Link to="/doctor/invoice/add">
            <LargeRoundedCornerButton
            className="large-rounded-corner-button py-1 px-5"
            text="Tạo hóa đơn"
            variant="primary"
            />
        </Link>
        
        <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-[#B4B4B4] border-2 rounded-lg h-8 w-60 pl-4"
            placeholder="Tìm kiếm"
        />
        </div>

        <div className="container">
          <div className="ag-theme-alpine bg-white rounded-lg shadow-md h-[500px]">
            {filteredInvoices && filteredInvoices.length > 0 ? (
              <AgGridReact
                columnDefs={columnDefs}
                rowData={filteredInvoices}
                pagination={true}
                paginationPageSize={10}
                rowHeight={60}
                quickFilterText={searchQuery}
                suppressHorizontalScroll={true}
              />
            ) : (
              <p>Không có hóa đơn nào để hiển thị.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceManagementPage;
