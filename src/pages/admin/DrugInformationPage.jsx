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

  useEffect(() => {
    const combineData = () => {
      const currentDrug = drugsData.find((drug) => drug.id === id);

      if (currentDrug) {
        const supplier = suppliersData.find(
          (sup) => sup.id === currentDrug.supplierId
        );

        const updatedDrug = {
          ...currentDrug,
          supplier: supplier ? supplier : null,
        };

        setDrug(updatedDrug);
      }
    };

    combineData();
  }, [id]);

  const handleDeleteDrug = () => {
    // Delete supplier
    console.log("Delete Supplier ID:", id);
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
            onClick={handleDeleteDrug}
            img="/src/assets/Trash.svg"
            variant="danger"
          />
        </div>

        {/*Display supplier information*/}
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
        </div>
      </div>
    </div>
  );
};

export default DrugInformationPage;
