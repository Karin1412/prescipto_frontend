import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import MenuOptions from '../../components/layout/MenuOptions.jsx';
import { menuOptions } from '../../data/menuOptionsData.jsx';
import useMenuOptionHandler from '../../components/layout/menuOptionHandlers.jsx';
import inventoryData from '../../data/inventoryData.jsx';

// Đăng ký các module cần thiết
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const InventoryReportPage = () => {
  const navigate = useNavigate();
  const [activeOption, setActiveOption] = useState('report');
  const [searchQuery, setSearchQuery] = useState('');
  const { handleOptionClick } = useMenuOptionHandler(setActiveOption);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedReport, setSelectedReport] = useState('inventory'); // State để quản lý lựa chọn báo cáo

  const columnDefs = [
    { headerName: "Tháng", field: "month", flex: 1, headerClass: "font-bold" },
    { headerName: "Năm", field: "year", flex: 1, headerClass: "font-bold" },
    { headerName: "Mã thuốc", field: "medicineID", flex: 2, headerClass: "font-bold" },
    { headerName: "Tên thuốc", field: "medicineName", flex: 3, headerClass: "font-bold" },
    { headerName: "Tồn đầu", field: "openingStock", flex: 2, headerClass: "font-bold" },
    { headerName: "Phát sinh", field: "incurred", flex: 2, headerClass: "font-bold" },
    { headerName: "Tồn cuối", field: "closingStock", flex: 2, headerClass: "font-bold" },
  ];  

  const filteredData = inventoryData.filter(
    (item) =>
      (selectedMonth === '' || item.month === selectedMonth) &&
      (selectedYear === '' || item.year === selectedYear) &&
      (item.medicineID.includes(searchQuery) ||
        item.medicineName.toLowerCase().includes(searchQuery.toLowerCase()))
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
        <div className="flex justify-between items-center mt-5 mb-5">
          <span className="uppercase font-medium text-2xl text-[#2A2A2A] font-raleway">
            BÁO CÁO TỒN
          </span>
        </div>

        {/* Bộ lọc và tìm kiếm */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            {/* Dropdown chọn tháng */}
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border-[#B4B4B4] border-2 rounded-lg h-8 px-3"
            >
              <option value="">Tất cả tháng</option>
              {[...Array(12).keys()].map((month) => (
                <option key={month + 1} value={(month + 1).toString().padStart(2, '0')}>
                  Tháng {month + 1}
                </option>
              ))}
            </select>

            {/* Dropdown chọn năm */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border-[#B4B4B4] border-2 rounded-lg h-8 px-3"
            >
              <option value="">Tất cả năm</option>
              {[2022, 2023, 2024].map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Ô tìm kiếm thuốc */}
          <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-[#B4B4B4] border-2 rounded-lg h-8 w-60 pl-4"
            placeholder="Tìm kiếm thuốc"
          />
        </div>

        {/* Bảng dữ liệu */}
        <div className="container h-full">
          <div
            className="ag-theme-quartz"
            style={{
              height: 'calc(100vh - 150px)',
            }}
          >
            {filteredData && filteredData.length > 0 ? (
              <AgGridReact
                columnDefs={columnDefs}
                rowData={filteredData}
                defaultColDef={{
                  resizable: true,
                  sortable: true,
                  filter: true,
                  cellStyle: { textAlign: 'center' },
                }}
                pagination={true}
                paginationPageSize={10}
                rowHeight={60}
                domLayout="normal"
                suppressHorizontalScroll={false}
                onGridReady={(params) => {
                  params.api.sizeColumnsToFit();
                }}
              />
            ) : (
              <p>Không có dữ liệu tồn kho để hiển thị.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryReportPage;
