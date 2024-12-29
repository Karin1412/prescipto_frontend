import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import medicinesData from "../../data/medicinesData";
import suppliersData from "../../data/suppliersData";
import ItemActionButton from "../../components/layout/ItemActionButton";
import "../../styles/ItemActionButton.css";

const MedicineInformationPage = () => {
  const { id } = useParams();
  const [medicine, setMedicine] = useState([]);
  const [showDetelePopup, setShowDetelePopup] = useState(false);

  useEffect(() => {
    const combineData = () => {
      const currentMedicine = medicinesData.find((medicine) => medicine.id === id);

      if (currentMedicine) {
        const supplier = suppliersData.find(
          (sup) => sup.id === currentMedicine.supplierId
        );

        const combinedMedicine = {
          ...currentMedicine,
          supplier: supplier ? supplier : null,
        };

        setMedicine(combinedMedicine);
      }
    };

    combineData();
  }, [id]);

  const deleteMedicineHandle = () => {
    setShowDetelePopup(true);
  };

  const handleDeletionConfirmation = () => {
    medicinesData.map((medicine) => {
      if (medicine.id === medicineToDelete) {
        return { ...medicine, status: "Ngừng sử dụng" };
      }
      return medicine;
    });

    console.log("Thuốc đã được xóa");
    toast.success("Thuốc đã được xóa");
    setShowDetelePopup(false);
  };

  const handleDeletionCancel = () => {
    setShowDetelePopup(false);
    console.log("Xóa thuốc đã bị hủy");
  };

  return (
    <div className="flex flex-row gap-5 mt-7 mr-16">
      <div className="w-1/6 ml-6">//Admin nav</div>
      <div className="w-5/6 mr-6">
        <div className="display flex flex-row gap-5 mb-7 items-center">
          <span className="uppercase font-medium text-2xl h-auto w-auto text-[#2A2A2A] font-raleway">
            Chi tiết thuốc
          </span>
          <Link to={`/admin/medicine/edit/${medicine.id}`}>
            <ItemActionButton
              className="item-action-button p-1 h-9 w-9"
              img="/src/assets/Edit.svg"
              variant="secondary"
            />
          </Link>
          <ItemActionButton
            className="item-action-button p-1 h-9 w-9"
            onClick={deleteMedicineHandle}
            img="/src/assets/Trash.svg"
            variant="danger"
          />
        </div>

        {/*Display medicine information*/}
        <div className="grid grid-cols-4 border border-[#B4B4B4]">
          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p className="text-xl">Mã thuốc:</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p className="text-xl">{medicine.id}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Tên thuốc:</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{medicine.medicineName}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Trạng thái:</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{medicine.status}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Hạn sử dụng</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{medicine.expiryDate}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Ngày nhập:</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{medicine.importDate}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Số lượng:</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{medicine.quantity}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Đơn vị tính:</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{medicine.unit}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Nhà cung cấp:</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{medicine.supplier?.supplierName}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Công dụng:</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{medicine.usesage}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Liều lượng:</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{medicine.dosage}</p>
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

export default MedicineInformationPage;
