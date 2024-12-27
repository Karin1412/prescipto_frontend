import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LargeRoundedCornerButton from "../../components/layout/LargeRoundedCornerButton";
import "../../styles/LargeRoundedCornerButton.css";
import suppliersData from "../../data/suppliersData";

const EditSupplierPage = () => {
  // Get the current supplier ID
  const { id } = useParams(); // Lấy id từ URL
  const [supplierName, setSupplierName] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const currentSupplier = suppliersData.find(
      (supplier) => supplier.id === id
    );

    if (currentSupplier) {
      setSupplierName(currentSupplier.supplierName || "");
      setStatus(currentSupplier.status);
    }
  }, []);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };


  const handleUpdateSupplierData = (event) => {
    event.preventDefault();
  
    if (!supplierName.trim()) {
      alert("Vui lòng nhập tên nhà cung cấp.");
      return;
    }
  
    alert("Lưu thông tin nhà cung cấp thành công");
  };

  return (
    <div className="flex flex-row gap-5 mt-7 mr-16">
      <div className="w-1/6 ml-6">//Admin nav</div>
      <div className="w-5/6 mr-6">
        <div className="display flex flex-row gap-5 mb-7">
          <span className="uppercase font-medium text-2xl h-auto w-auto text-[#2A2A2A] font-raleway">
            Cập nhật nhà cung cấp
          </span>
        </div>

        {/* Edit Supplier Layout */}
        <form onSubmit={handleUpdateSupplierData} className="flex flex-col gap-8">
          <div className="display flex flex-row justify-start">
            <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans w-1/4">
              Mã nhà cung cấp:
            </span>
            <p className="border-[#B4B4B4] rounded-lg h-8 border px-4 pt-1 bg-[#B4B4B4]">
              {id}
            </p>
          </div>
          <div className="display flex flex-row justify-start">
            <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans w-1/4">
              Tên nhà cung cấp:
            </span>
            <input
              type="text"
              className="border-[#B4B4B4] rounded-lg h-8 border pl-4 w-1/2"
              placeholder="Nhập tên nhà cung cấp"
              defaultValue={supplierName}
            />
          </div>
          <div className="display flex flex-row justify-start">
            <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans w-1/4">
              Trạng thái:
            </span>
            <select
              type="text"
              className="border-[#B4B4B4] rounded-lg h-8 border px-4 w-fit"
              value={status}
              onChange={handleStatusChange}
            >
              <option value="Đang cung cấp">Đang cung cấp</option>
              <option value="Ngừng cung cấp">Ngừng cung cấp</option>
            </select>
          </div>

          <LargeRoundedCornerButton
            className="large-rounded-corner-button px-10 py-1 self-end"
            text="Lưu"
            variant="primary"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default EditSupplierPage;
