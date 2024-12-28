import { React, useState } from "react";
import { toast } from "react-toastify";
import LargeRoundedCornerButton from "../../components/layout/LargeRoundedCornerButton";
import "../../styles/LargeRoundedCornerButton.css";
import suppliersData from "../../data/suppliersData";
import { useNavigate } from "react-router-dom";

const AddDrugPage = () => {
  const navigate = useNavigate();
  const [inputName, setInputName] = useState("");
  const [inputImportPrice, setInputImportPrice] = useState();
  const [inputSellingPrice, setInputSellingPrice] = useState();
  const [inputUnit, setInputUnit] = useState("");
  const [inputImportDate, setInputImportDate] = useState("");
  const [inputExpiryDate, setInputExpiryDate] = useState("");
  const [inputUsesage, setInputUsesage] = useState("");
  const [inputDosage, setInputDosage] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");

  const isValidForm = () => {
    if (!inputName.trim()) {
      alert("Vui lòng nhập tên thuốc.");
      return false;
    }

    if (!selectedSupplier) {
      alert("Vui lòng chọn nhà cung cấp.");
      return false;
    }

    if (
      !inputImportPrice ||
      isNaN(Number(inputImportPrice)) ||
      Number(inputImportPrice) <= 0
    ) {
      alert("Giá nhập phải là số hợp lệ và lớn hơn 0.");
      return false;
    }

    if (
      !inputSellingPrice ||
      isNaN(Number(inputSellingPrice)) ||
      Number(inputSellingPrice) <= 0
    ) {
      alert("Giá bán phải là số hợp lệ và lớn hơn 0.");
      return false;
    }

    if (!inputUnit.trim()) {
      alert("Vui lòng nhập đơn vị tính.");
      return false;
    }

    if (!inputImportDate) {
      alert("Vui lòng nhập ngày nhập.");
      return false;
    }

    if (!inputExpiryDate) {
      alert("Vui lòng nhập hạn sử dụng.");
      return false;
    }

    if (new Date(inputImportDate) >= new Date(inputExpiryDate)) {
      alert("Hạn sử dụng phải sau ngày nhập.");
      return false;
    }

    if (!inputUsesage.trim()) {
      alert("Vui lòng nhập công dụng.");
      return false;
    }

    if (!inputDosage.trim()) {
      alert("Vui lòng nhập liều dùng.");
      return false;
    }

    return true;
  };

  const handleCreateNewDrug = (e) => {
    e.preventDefault();
    if (isValidForm()) {
      console.log("Form Submitted Successfully:", {
        inputName,
        selectedSupplier,
        inputImportPrice,
        inputSellingPrice,
        inputUnit,
        inputImportDate,
        inputExpiryDate,
        inputUsesage,
        inputDosage,
      });
      toast.success("Tạo thuốc mới thành công");
    }
    navigate("/admin/drugs");
  };

  const handleSupplierChange = (event) => {
    setSelectedSupplier(event.target.value);
  };

  return (
    <div className="flex flex-row gap-5 mt-7 mr-16">
      <div className="w-1/6 ml-6">//Admin nav</div>
      <div className="w-5/6 mr-6">
        <div className="display flex flex-row justify-between mb-7 ">
          <span className="uppercase font-medium text-2xl h-auto w-auto text-[#2A2A2A] font-raleway">
            Tạo thuốc mới
          </span>
        </div>

        {/* Add Drug Layout */}
        <form onSubmit={handleCreateNewDrug} className="flex flex-col gap-8">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col justify-start">
              <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                Mã thuốc:
              </span>
              <p className="border-[#B4B4B4] rounded-lg h-8 w-fit border px-4 pt-1 bg-[#B4B4B4]">
                TC001
              </p>
            </div>
            <div className="flex flex-col w-1/3">
              <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                Tên thuốc:
              </span>
              <input
                type="text"
                className="border-[#B4B4B4] rounded-lg h-8 border pl-4"
                placeholder="Nhập tên thuốc"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
              />
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
          </div>

          <div className="flex flex-row justify-start gap-20">
            <div className="flex flex-col justify-start w-1/4">
              <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                Giá nhập:
              </span>
              <div className="flex gap-2">
                <input
                  type="number"
                  className="border-[#B4B4B4] rounded-lg h-8 border pl-4"
                  placeholder="Nhập giá nhập"
                  value={inputImportPrice}
                  onChange={(e) => setInputImportPrice(e.target.value)}
                />
                <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                  VND
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-start w-1/4">
              <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                Giá bán:
              </span>
              <div className="flex gap-2">
                <input
                  type="number"
                  className="border-[#B4B4B4] rounded-lg h-8 border pl-4"
                  placeholder="Nhập giá bán"
                  value={inputSellingPrice}
                  onChange={(e) => setInputSellingPrice(e.target.value)}
                />
                <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                  VND
                </span>
              </div>
            </div>
            <div className="flex flex-col w-1/4">
              <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                Đơn vị tính:
              </span>
              <input
                type="text"
                className="border-[#B4B4B4] rounded-lg h-8 border pl-4"
                placeholder="Nhập đơn vị tính"
                value={inputUnit}
                onChange={(e) => setInputUnit(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-row justify-start gap-20">
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
            <div className="flex flex-col w-1/4">
              <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                Hạn sử dụng:
              </span>
              <input
                type="date"
                className="border-[#B4B4B4] rounded-lg h-8 border pl-4 pr-2"
                value={inputExpiryDate}
                onChange={(e) => setInputExpiryDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col justify-start">
            <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
              Công dụng:
            </span>
            <textarea
              type="text"
              className="border-[#B4B4B4] rounded-lg h-8 border pl-4 pr-2 pt-1"
              value={inputUsesage}
              placeholder="Nhập công dụng"
              onChange={(e) => setInputUsesage(e.target.value)}
            />
          </div>

          <div className="flex flex-col justify-start">
            <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
              Liều dùng:
            </span>
            <textarea
              type="text"
              className="border-[#B4B4B4] rounded-lg h-8 border pl-4 pr-2 pt-1"
              value={inputDosage}
              placeholder="Nhập liều dùng"
              onChange={(e) => setInputDosage(e.target.value)}
            />
          </div>

          <div className="flex flex-col justify-start w-1/3"></div>
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

export default AddDrugPage;
