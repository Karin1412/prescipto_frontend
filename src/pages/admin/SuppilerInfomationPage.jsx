import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import suppliersData from "../../data/suppliersData";
import ItemActionButton from "../../components/layout/ItemActionButton";
import "../../styles/ItemActionButton.css";

const SuppilerInfomationPage = () => {
  // Get the current supplier ID
  const { id } = useParams();
  const [supplier, setSupplier] = useState([]);

  useEffect(() => {
    const currentSupplier = suppliersData.find(
      (supplier) => supplier.id === id
    );

    if (currentSupplier) {
      setSupplier(currentSupplier);
    }
  }, []);

  const handleDeleteSupplier = () => {
    // Delete supplier
    console.log("Delete Supplier ID:", id);
  };

  return (
    <div className="flex flex-row gap-5 mt-7 mr-16">
      <div className="w-1/6 ml-6">//Admin nav</div>
      <div className="w-5/6 mr-6">
        <div className="display flex flex-row gap-5 mb-7 items-center">
          <span className="uppercase font-medium text-2xl h-auto w-auto text-[#2A2A2A] font-raleway">
            Chi tiết nhà cung cấp
          </span>
          <Link to={`/admin/supplier/edit/${supplier.id}`}>
            <ItemActionButton
              className="item-action-button p-1 h-9 w-9"
              img="/src/assets/Edit.svg"
              variant="secondary"
            />
          </Link>
          <ItemActionButton
            className="item-action-button p-1 h-9 w-9"
            onClick={handleDeleteSupplier}
            img="/src/assets/Trash.svg"
            variant="danger"
          />
        </div>

        {/*Display supplier information*/}
        <div className="grid grid-cols-4 border border-[#B4B4B4]">
          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p className="text-xl">Mã nhà cung cấp:</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p className="text-xl">{supplier.id}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Tên nhà cung cấp:</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{supplier.supplierName}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Trạng thái:</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{supplier.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuppilerInfomationPage;
