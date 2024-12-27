import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import drugsData from "../../data/drugsData";
import suppliersData from "../../data/suppliersData";
import ItemActionButton from "../../components/layout/ItemActionButton";
import "../../styles/ItemActionButton.css";

const DrugInformationPage = () => {
  const { id } = useParams();
  const [drug, setDrug] = useState([]);
  const [showDetelePopup, setShowDetelePopup] = useState(false);

  useEffect(() => {
    const combineData = () => {
      const currentDrug = drugsData.find((drug) => drug.id === id);

      if (currentDrug) {
        const supplier = suppliersData.find(
          (sup) => sup.id === currentDrug.supplierId
        );

        const combinedDrug = {
          ...currentDrug,
          supplier: supplier ? supplier : null,
        };

        setDrug(combinedDrug);
      }
    };

    combineData();
  }, [id]);

  const deleteDrugHandle = () => {
    setShowDetelePopup(true);
  };

  const handleDeletionConfirmation = () => {
    drugsData.map((drug) => {
      if (drug.id === drugToDelete) {
        return { ...drug, status: "Ngừng sử dụng" };
      }
      return drug;
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
          <Link to={`/admin/drug/edit/${drug.id}`}>
            <ItemActionButton
              className="item-action-button p-1 h-9 w-9"
              img="/src/assets/Edit.svg"
              variant="secondary"
            />
          </Link>
          <ItemActionButton
            className="item-action-button p-1 h-9 w-9"
            onClick={deleteDrugHandle}
            img="/src/assets/Trash.svg"
            variant="danger"
          />
        </div>

        {/*Display drug information*/}
        <div className="grid grid-cols-4 border border-[#B4B4B4]">
          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p className="text-xl">Mã thuốc:</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p className="text-xl">{drug.id}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Tên thuốc:</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{drug.drugName}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Trạng thái:</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{drug.status}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Hạn sử dụng</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{drug.expiryDate}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Ngày nhập:</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{drug.importDate}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Số lượng:</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{drug.quantity}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Đơn vị tính:</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{drug.unit}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Nhà cung cấp:</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{drug.supplier?.supplierName}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Công dụng:</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{drug.usesage}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Liều lượng:</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{drug.dosage}</p>
          </div>

          {/* Delete Drug Popup */}
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

export default DrugInformationPage;
