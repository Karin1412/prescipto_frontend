import { React, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LargeRoundedCornerButton from "../../components/layout/LargeRoundedCornerButton";
import "../../styles/LargeRoundedCornerButton.css";
import goodsReceiptNotesData from "../../data/goodsReceiptNotesData";
import goodsReceiptNoteDetailsData from "../../data/goodsReceiptNoteDetailsData";
import suppliersData from "../../data/suppliersData";
import medicinesData from "../../data/medicinesData";
import MenuOptions from '../../components/layout/MenuOptions';
import { menuOptions } from '../../data/menuOptionsData';
import useMenuOptionHandler from '../../components/layout/menuOptionHandlers';
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import ItemActionButton from "../../components/layout/ItemActionButton";

// Đăng ký module ClientSideRowModelModule
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const AddGoodsReceiptNotePage = () => {
  const [inputImportDate, setInputImportDate] = useState(
    sessionStorage.getItem("importDate") || ""
  );
  const [selectedSupplier, setSelectedSupplier] = useState(
    sessionStorage.getItem("supplierName") || ""
  );
  const [totalCost, setTotalCost] = useState(0);
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [activeOption, setActiveOption] = useState("goods-receipt-notes");
  const { handleOptionClick } = useMenuOptionHandler(setActiveOption);

  useEffect(() => {
    const setAddedMedicines = () => {
      //Tìm các thuốc đã thêm
      const medicinesAdded = medicinesData;
      setMedicines(medicinesAdded);

      let newTotalCost = 0;

      medicinesAdded.forEach((medicine) => {
        newTotalCost += medicine.importPrice * medicine.quantity;
      });

      setTotalCost(newTotalCost);
    };

    setAddedMedicines();
  }, []);

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
      width: 130,
    },
    {
      headerName: "Hạn sử dụng",
      field: "expiryDate",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "grid-cell-centered",
      width: 120,
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
      headerName: "Đơn vị",
      field: "unit",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "grid-cell-centered",
      width: 100,
    },
    {
      headerName: "Giá nhập",
      field: "importPrice",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "grid-cell-centered",
      width: 150,
    },
    {
      headerName: "Tổng giá nhập",
      field: "totalImportPrice",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "grid-cell-centered",
      width: 150,
    },
    {
      headerName: "Hành động",
      field: "actions",
      width: 110,
      cellRenderer: (params) => (
        <div className="flex">
          <ItemActionButton
            img="/src/assets/Trash.svg"
            variant="danger"
            className="item-action-button h-6 w-6 m-2 p-1"
            type="delete-button"
            onClick={() =>
              handleRemoveMedicineFromGoodsReceiptNoteHandle(params.data.id)
            }
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
    unit: medicine.unit,
    importPrice: medicine.importPrice + " VND",
    totalImportPrice: medicine.importPrice * medicine.quantity + " VND",
  }));

  const isValidForm = () => {
    if (!selectedSupplier) {
      alert("Vui lòng chọn nhà cung cấp.");
      return false;
    }

    if (!inputImportDate) {
      alert("Vui lòng nhập ngày nhập.");
      return false;
    }

    const selectedDate = new Date(inputImportDate);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      alert("Ngày nhập phải bằng hoặc sau ngày hiện tại.");
      return;
    }

    if (medicines.length == 0) {
      alert("Vui lòng thêm ít nhất một loại thuốc!");
      return;
    }

    return true;
  };

  const handleCreateNewGoodsReceiptNote = (e) => {
    e.preventDefault();
    if (isValidForm()) {
      console.log("Form Submitted Successfully:", {
        selectedSupplier,
        inputImportDate,
        totalCost,
        medicines,
      });
      toast.success("Tạo phiếu nhập mới thành công");
      navigate("/admin/goods-receipt-note/add/add-medicine");
    }
  };

  const handleSupplierChange = (event) => {
    setSelectedSupplier(event.target.value);
  };

  const handleRemoveMedicineFromGoodsReceiptNoteHandle = (event) => {
    //Xóa thuốc khỏi phiếu
    //tính lại tổng tiền
  };

  const handleAddMedicine = () => {
    if (!selectedSupplier.trim()) {
      alert("Vui lòng chọn một nhà cung cấp.");
      return;
    }

    if (!inputImportDate) {
      alert("Vui lòng nhập ngày nhập kho.");
      return;
    }

    const selectedDate = new Date(inputImportDate);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      alert("Ngày nhập phải bằng hoặc sau ngày hiện tại.");
      return;
    }

    sessionStorage.setItem("selectedSupplier", selectedSupplier);
    sessionStorage.setItem("importDate", inputImportDate);
    navigate("/admin/goods-receipt-note/add/add-medicine");
  };

  return (
    <div className="flex flex-row gap-5 mt-7 mr-16">
      <div className="w-1/6 ml-6">
      <MenuOptions
          options={menuOptions}
          activeOption={activeOption}
          onOptionClick={handleOptionClick}
        /></div>
      <div className="w-5/6 mr-6">
        <div className="display flex flex-row justify-between mb-7 ">
          <span className="uppercase font-medium text-2xl h-auto w-auto text-[#2A2A2A] font-raleway">
            Tạo phiếu nhập mới
          </span>
        </div>

        {/* Add Goods Receipt Note Layout */}
        <form
          onSubmit={handleCreateNewGoodsReceiptNote}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-row justify-between">
            <div className="flex flex-col justify-start">
              <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                Mã phiếu nhập:
              </span>
              <p className="border-[#B4B4B4] rounded-lg h-8 w-fit border px-4 pt-1 bg-[#B4B4B4]">
                PN000001
              </p>
            </div>
            <div className="flex flex-col w-1/3">
              <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                Tên nhà cung cấp:
              </span>
              <select
                id="supplier-select"
                type="text"
                className="border-[#B4B4B4] rounded-lg h-8 border px-4"
                value={selectedSupplier}
                onChange={handleSupplierChange}
              >
                <option value="" disabled>
                  -- Chọn một nhà cung cấp --
                </option>
                {suppliersData.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.supplierName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col justify-start w-1/4">
              <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                Ngày nhập:
              </span>
              <input
                type="date"
                className="border-[#B4B4B4] rounded-lg h-8 border pl-4 pr-2"
                value={inputImportDate}
                onChange={(e) => setInputImportDate(e.target.value)}
              />
            </div>
          </div>

          {/*Display medicine list*/}
          <div className="container">
            <div className="flex justify-start gap-8 mb-4 items-center">
              <h1 className="size-6 w-auto uppercase text-[#2A2A2A]">
                {medicines.length} Loại thuốc - Tổng tiền: {totalCost} VND
              </h1>
              <LargeRoundedCornerButton
                className="large-rounded-corner-button px-5 py-1 self-end"
                text="Thêm thuốc vào phiếu"
                variant="primary"
                type="add-medicine-to-goods-receipt-note"
                onClick={handleAddMedicine}
              />
            </div>
            <div>
              {rowData && rowData.length > 0 ? (
                <div className="ag-theme-quartz h-[360px]">
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    rowModelType="clientSide"
                    domLayout="normal"
                    pagination={true}
                    paginationPageSize={5}
                    rowHeight={60}
                  />
                </div>
              ) : (
                <p className="h-[30px]">Không có thuốc nào để hiển thị.</p>
              )}
            </div>
          </div>

          <LargeRoundedCornerButton
            className="large-rounded-corner-button px-5 py-1 self-end"
            text="Tạo thuốc mới"
            variant="primary"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default AddGoodsReceiptNotePage;
