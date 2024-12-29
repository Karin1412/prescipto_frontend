import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import medicinesData from "../../data/medicinesData";
import ItemActionButton from "../../components/layout/ItemActionButton";
import "../../styles/ItemActionButton.css";
import "../../styles/Popup.css";
import { Link } from "react-router-dom";
import LargeRoundedCornerButton from "../../components/layout/LargeRoundedCornerButton";
import "../../styles/LargeRoundedCornerButton.css";

// Đăng ký module ClientSideRowModelModule
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const MedicineManagementPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [quickFilterText, setQuickFilterText] = useState("");
  const [showDetelePopup, setShowDetelePopup] = useState(false); 
  const [medicineToDelete, setMedicineToDelete] = useState(null); 

  useEffect(() => {
    setMedicines(medicinesData);
  }, []);

  const deleteMedicineHandle = (id) => {
    setMedicineToDelete(id); 
    setShowDetelePopup(true); 
  };

  const handleDeletionConfirmation = () => {
    const updatedMedicines = medicinesData.map((medicine) => {
      if (medicine.id === medicineToDelete) {
        return { ...medicine, status: "Ngừng sử dụng" };
      }
      return medicine;
    });
    setMedicines(updatedMedicines); // Update medicine list
    console.log("Thuốc đã được xóa");
    toast.success("Thuốc đã được xóa");

    setShowDetelePopup(false);
    setMedicineToDelete(null);
  };

  const handleDeletionCancel = () => {
    setShowDetelePopup(false);
    setMedicineToDelete(null);
    console.log("Xóa thuốc đã bị hủy");
  };

  const columnDefs = [
    {
      headerName: "Mã thuốc",
      field: "id",
      sortable: true,
      filter: true,
      resizable: true,
      width: 100,
    },
    {
      headerName: "Tên thuốc",
      field: "medicineName",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: "Hạn sử dụng",
      field: "expiryDate",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: "Số lượng",
      field: "quantity",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "grid-cell-centered",
      width: 100,
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
          case "Đang sử dụng":
            color = "#5F6FFF";
            break;
          case "Ngừng sử dụng":
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
          <Link to={`/admin/medicine/${params.data.id}`}>
            <ItemActionButton
              img="/src/assets/Information Circle Contained.svg"
              variant="primary"
              className="item-action-button h-6 w-6 m-2 p-1"
            />
          </Link>
          <Link to={`/admin/medicine/edit/${params.data.id}`}>
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
            onClick={() => deleteMedicineHandle(params.data.id)}
          />
        </div>
      ),
      resizable: true,
    },
  ];

  const rowData = medicines.map((medicine) => ({
    id: medicine.id,
    medicineName: medicine.medicineName,
    expiryDate: medicine.expiryDate,
    quantity: medicine.quantity,
    status: medicine.status,
  }));

  return (
    <div className="flex flex-row gap-5 mt-7">
      <div className="w-1/6 ml-6">//Admin nav</div>
      <div className="w-5/6 mr-6">
        <div className="display flex flex-row justify-between">
          <span className="uppercase font-medium text-2xl h-auto w-auto text-[#2A2A2A] mb-7 font-raleway">
            Danh sách Thuốc
          </span>
        </div>

        {/* Medicine List */}
        <div className="container">
          <div className="flex justify-between mb-4 items-center">
            <div className="flex justify-between items-center">
              <h1 className="size-6 w-auto uppercase text-[#2A2A2A]">
                {medicines.length} Thuốc
              </h1>
              <Link to="/admin/medicine/add">
                <LargeRoundedCornerButton
                  className="large-rounded-corner-button py-1 px-5 mx-5"
                  text="Tạo thuốc mới"
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
              <p>Không có thuốc nào để hiển thị.</p>
            )}
          </div>
          {/* Delete Medicine Popup */}
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
                <p>Thuốc sẽ trở về trạng thái "Ngừng sử dụng".</p>
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

export default MedicineManagementPage;
