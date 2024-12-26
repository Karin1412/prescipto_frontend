import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import suppliersData from "../../data/suppliersData";
import ItemActionButton from "../../components/layout/ItemActionButton";
import "../../styles/ItemActionButton.css";
import "../../styles/Popup.css";
import { Link } from "react-router-dom";
import LargeRoundedCornerButton from "../../components/layout/LargeRoundedCornerButton";
import "../../styles/LargeRoundedCornerButton.css";

// Đăng ký module ClientSideRowModelModule
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const SupplierManagementPage = () => {
  const [suppilers, setSuppilers] = useState([]);
  const [quickFilterText, setQuickFilterText] = useState("");
  const [showDetelePopup, setShowDetelePopup] = useState(false); // State for detele popup visibility
  const [suppilerToDelete, setSuppilerToDelete] = useState(null); // Store the suppiler to delete

  useEffect(() => {
    setSuppilers(suppliersData);
  }, []);

  // Handle the deletion of an suppiler
  const deleteSuppilerHandle = (id) => {
    setSuppilerToDelete(id); // Set the suppiler ID for deletion
    setShowDetelePopup(true); // Show the popup
  };

  const handleDeletionConfirmation = () => {
    const updatedSuppilers = suppliersData.map((suppiler) => {
      if (suppiler.id === suppilerToDelete) {
        return { ...suppiler, status: "Ngừng hoạt động" };
      }
      return suppiler;
    });
    setSuppilers(updatedSuppilers); // Update the state
    console.log("Nhà cung cấp đã được xóa");
    toast.success("Nhà cung cấp đã được xóa");

    // Close the popup and reset
    setShowDetelePopup(false);
    setSuppilerToDelete(null);
  };

  const handleDeletionCancel = () => {
    setShowDetelePopup(false);
    setSuppilerToDelete(null);
    console.log("Xóa nhà cung cấp đã bị hủy");
  };

  const columnDefs = [
    {
      headerName: "Mã nhà cung cấp",
      field: "id",
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: "Tên nhà cung cấp",
      field: "supplierName",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "grid-cell-centered",
      width: 300,
    },
    {
      headerName: "Trạng thái",
      field: "status",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "grid-cell-centered",
      cellStyle: (params) => {
        // Change color based on status value
        switch (params.value) {
          case "Đang hoạt động":
            color = "#5F6FFF";
            break;
          case "Ngừng hoạt động":
            color = "#4B5563";
            break;
          default:
            color = "black";
        }
        return { color };
      },
    },
    {
      headerName: "Hành động",
      field: "actions",
      cellRenderer: (params) => (
        <div className="flex">
          <Link to={`/admin/supplier/${params.data.id}`}>
            <ItemActionButton
              img="/src/assets/Information Circle Contained.svg"
              variant="primary"
              className="item-action-button h-6 w-6 m-2 p-1"
            />
          </Link>
          <Link to={`/admin/supplier/edit/${params.data.id}`}>
            <ItemActionButton
              img="/src/assets/Edit.svg"
              variant="secondary"
              className="item-action-button h-6 w-6 m-2 p-1"
            />
          </Link>
          <ItemActionButton
            img="/src/assets/Trash.svg"
            variant="danger"
            className="item-action-button h-6 w-6 m-2 p-1"
            onClick={() => deleteSuppilerHandle(params.data.id)}
          />
        </div>
      ),
      resizable: true,
    },
  ];

  const rowData = suppilers.map((supplierName) => ({
    id: supplierName.id,
    supplierName: supplierName.supplierName,
    status: supplierName.status,
  }));

  return (
    <div className="flex flex-row gap-5 mt-7">
      <div className="w-1/6 ml-6">//Admin nav</div>
      <div className="w-5/6 mr-6">
        <div className="display flex flex-row justify-between">
          <span className="uppercase font-medium text-2xl h-auto w-auto text-[#2A2A2A] mb-7 font-raleway">
            Danh sách Nhà cung cấp
          </span>
        </div>

        {/* Supplier List */}
        <div className="container">
          <div className="flex justify-between mb-4 items-center">
            <div className="flex justify-between items-center">
              <h1 className="size-6 w-auto uppercase text-[#2A2A2A]">
                {suppilers.length} Nhà cung cấp
              </h1>
              <Link to="/admin/supplier/add">
                <LargeRoundedCornerButton
                  className="large-rounded-corner-button py-1 px-5 mx-5"
                  text="Tạo nhà cung cấp mới"
                  variant="primary"
                />
              </Link>
            </div>

            <input
              type="text"
              onChange={(e) => setQuickFilterText(e.target.value)}
              className="border-[#B4B4B4] rounded-lg h-8 border w-60 pl-4"
              placeholder="Tìm kiếm"
            />
          </div>
          <div className="ag-theme-quartz h-[600px]">
            {rowData && rowData.length > 0 ? (
              <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                rowModelType="clientSide"
                domLayout="normal"
                quickFilterText={quickFilterText}
                pagination={true}
                paginationPageSize={10}
                rowHeight={60}
              />
            ) : (
              <p>Không có nhà cung cấp nào để hiển thị.</p>
            )}
          </div>
          {/* Delete Supplier Popup */}
          {showDetelePopup && (
            <div className="popup-overlay">
              <div className="popup">
                <div className="popup-header">
                  <h2>Bạn có chắc chắn muốn xóa?</h2>
                  <button
                    className="close-button"
                    onClick={handleDeletionCancel}
                  >
                    <img src="/src/assets/X black.svg" alt="Close" />
                  </button>
                </div>
                <p>Nhà cung cấp sẽ trở về trạng thái "Ngừng hoạt động".</p>
                <div className="button-group">
                  <button className="no-button" onClick={handleDeletionCancel}>
                    Không
                  </button>
                  <button
                    className="yes-button"
                    onClick={handleDeletionConfirmation}
                  >
                    Có
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierManagementPage;