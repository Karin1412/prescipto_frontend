import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuOptions from '../../components/layout/MenuOptions.jsx';
import { menuOptions } from '../../data/menuOptionsData.jsx';
import useMenuOptionHandler from '../../components/layout/menuOptionHandlers.jsx';
import invoiceData from '../../data/invoiceData.jsx';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import ItemActionButton from "../../components/layout/ItemActionButton.jsx";
import "../../styles/ItemActionButton.css";
import LargeRoundedCornerButton from "../../components/layout/LargeRoundedCornerButton.jsx";
import "../../styles/LargeRoundedCornerButton.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const InvoiceManagementPage = () => {
  const [invoices] = useState(invoiceData); 
  const [searchQuery, setSearchQuery] = useState('');
  const [activeOption, setActiveOption] = useState('invoices');

  const { handleOptionClick } = useMenuOptionHandler(setActiveOption);

  React.useEffect(() => {
    const successMessage = sessionStorage.getItem("invoiceSuccessMessage");
    if (successMessage) {
      toast.success(successMessage);
      sessionStorage.removeItem("invoiceSuccessMessage");
    }
  }, []);

  const defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    cellStyle: { textAlign: 'center' },
};

  
  const columnDefs = [
    {
      headerName: "#",
      valueGetter: (params) => params.node.rowIndex + 1,
      width: 70,
    },
    {
      headerName: "Mã hóa đơn",
      field: "invoiceID",
      flex: 2,
    },
    {
      headerName: "Tên bệnh nhân",
      field: "patientName",
      flex: 2,
    },
    {
      headerName: "Ngày lập",
      field: "invoiceDate",
      flex: 2,
    },
    {
      headerName: "Trạng thái",
      field: "invoiceStatus",
      flex: 2,
      cellStyle: (params) => {
        let color;
        switch (params.value) {
          case "Đã thanh toán":
            color = "#4CAF50";
            break;
          case "Chưa thanh toán":
            color = "#FF5722";
            break;
          default:
            color = "black";
        }
        return { color };
      },
    },
    {
      headerName: "Hành động",
      field: "invoiceID",
      cellRenderer: (params) => (
        <Link to={`/admin/invoice/${params.value}`}>
          <ItemActionButton
            img="/src/assets/Information Circle Contained.svg"
            variant="primary"
            className="item-action-button h-6 w-6 m-2 p-1"
          />
        </Link>
      ),
      flex: 1.5,
    },
  ];
  
  
  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.invoiceID.includes(searchQuery) ||
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

        <div className="flex justify-between items-center mt-5">
        {/* Tiêu đề "Danh sách hóa đơn" */}
        <span className="uppercase font-medium text-2xl text-[#2A2A2A] mb-7 font-raleway">
            Danh sách Hóa đơn
        </span>
        </div>

        <div className="flex justify-between items-center mb-4">
        <Link to="/admin/invoice/add">
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
              defaultColDef={defaultColDef}
              rowData={filteredInvoices}
              pagination={true}
              paginationPageSize={10}
              rowHeight={60}
              quickFilterText={searchQuery}
              suppressHorizontalScroll={true}
              onGridReady={(params) => {
                params.api.sizeColumnsToFit();
              }}
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
