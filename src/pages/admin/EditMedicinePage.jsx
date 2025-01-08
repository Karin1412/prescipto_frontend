import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LargeRoundedCornerButton from "../../components/layout/LargeRoundedCornerButton";
import "../../styles/LargeRoundedCornerButton.css";
import medicinesData from "../../data/medicinesData";
import suppliersData from "../../data/suppliersData";

const EditMedicinePage = () => {
  // Get the current supplier ID
  const { id } = useParams(); // Lấy id từ URL
  const [inputName, setInputName] = useState("");
  const [inputImportPrice, setInputImportPrice] = useState();
  const [inputSellingPrice, setInputSellingPrice] = useState();
  const [inputQuantity, setInputQuantity] = useState();
  const [inputUnit, setInputUnit] = useState("");
  const [inputImportDate, setInputImportDate] = useState("");
  const [inputExpiryDate, setInputExpiryDate] = useState("");
  const [inputStatus, setInputStatus] = useState("");
  const [inputUsesage, setInputUsesage] = useState("");
  const [inputDosage, setInputDosage] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");

  useEffect(() => {
    const combineData = () => {
      const currentMedicine = medicinesData.find((medicine) => medicine.id === id);

      if (currentMedicine) {
        const supplier = suppliersData.find(
          (sup) => sup.id === currentMedicine.supplierId
        );

        const updatedMedicine = {
          ...currentMedicine,
          supplier: supplier ? supplier : null,
        };

      // Cập nhật các input values sau khi medicine được set
      setInputName(updatedMedicine.medicineName);  
      setInputImportPrice(updatedMedicine.importPrice);
      setInputSellingPrice(updatedMedicine.sellingPrice);
      setInputQuantity(updatedMedicine.quantity);
      setInputUnit(updatedMedicine.unit);
      setInputImportDate(updatedMedicine.importDate);
      setInputExpiryDate(updatedMedicine.expiryDate);
      setInputStatus(updatedMedicine.status);
      setInputUsesage(updatedMedicine.usesage);
      setInputDosage(updatedMedicine.dosage);

        if (updatedMedicine.supplier) {
          setSelectedSupplier(updatedMedicine.supplier.supplierName);
        } else {
          setSelectedSupplier("");
        }
        setInputStatus(updatedMedicine.status);
      }
    };

    combineData();
  }, [id]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSupplierChange = (event) => {
    setSelectedSupplier(event.target.value);
  };

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

    if (
      !inputQuantity ||
      isNaN(Number(inputQuantity)) || 
      !Number.isInteger(inputQuantity) ||
      Number(inputQuantity) <= 0
    ) {
      alert("Số lượng phải là số số nguyên và lớn hơn 0.");
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

  const handleUpdateMedicine = (e) => {
    e.preventDefault();
    if (isValidForm()) {
      console.log("Form Submitted Successfully:", {
        inputName,
        selectedSupplier,
        inputImportPrice,
        inputSellingPrice,
        inputQuantity,
        inputUnit,
        inputImportDate,
        inputExpiryDate,
        inputUsesage,
        inputDosage,
        inputStatus,
      });
      toast.success("Đã cập nhật thành công");
    }
  };

  return (
    <div className="flex flex-row gap-5 mt-7 mr-16">
      <div className="w-1/6 ml-6">//Admin nav</div>
      <div className="w-5/6 mr-6">
        <div className="display flex flex-row justify-between mb-7 ">
          <span className="uppercase font-medium text-2xl h-auto w-auto text-[#2A2A2A] font-raleway">
            Cập nhật thuốc
          </span>
        </div>

        {/* Add Medicine Layout */}
        <form onSubmit={handleUpdateMedicine} className="flex flex-col gap-8">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col justify-start">
              <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                Mã thuốc:
              </span>
              <p className="border-[#B4B4B4] rounded-lg h-8 w-fit border px-4 pt-1 bg-[#B4B4B4]">
                {id}
              </p>
            </div>
            <div className="flex flex-col w-1/3">
              <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                Tên thuốc:
              </span>
              <input
                id="medicineNameInput"
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
                id="supplierSelect"
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

          <div className="flex flex-row justify-between">
            <div className="flex flex-col justify-start w-1/3">
              <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                Giá nhập:
              </span>
              <div className="flex justify-between gap-2">
                <input
                  id="medicineImportPriceInput"
                  type="number"
                  className="border-[#B4B4B4] rounded-lg h-8 w-full border pl-4"
                  placeholder="Nhập giá nhập"
                  value={inputImportPrice}
                  onChange={(e) => setInputImportPrice(e.target.value)}
                />
                <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                  VND
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-start w-1/3">
              <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                Giá bán:
              </span>
              <div className="flex justify-between gap-2">
                <input
                  id="medicineImportPriceInput"
                  type="number"
                  className="border-[#B4B4B4] rounded-lg h-8 w-full border pl-4"
                  placeholder="Nhập giá bán"
                  value={inputSellingPrice}
                  onChange={(e) => setInputSellingPrice(e.target.value)}
                />
                <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                  VND
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-start w-1/4">
              <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                Trạng thái:
              </span>
              <select
                id="status-select"
                type="text"
                className="border-[#B4B4B4] rounded-lg h-8 border px-4"
                value={inputStatus}
                onChange={handleStatusChange}
              >
                <option value="Đang sử dụng">Đang sử dụng</option>
                <option value="Ngừng sử dụng">Ngừng sử dụng</option>
              </select>
            </div>
          </div>

          <div className="flex flex-row justify-start gap-20">
            <div className="flex flex-col justify-start w-1/3">
              <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                Số lượng:
              </span>
                <input
                  id="medicineQuantityInput"
                  type="number"
                  step="1"
                  className="border-[#B4B4B4] rounded-lg h-8 border pl-4"
                  placeholder="Nhập số lượng"
                  value={inputQuantity}
                  onChange={(e) => setInputQuantity(e.target.value)}
                />
            </div>
            <div className="flex flex-col justify-start w-1/3">
              <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                Đơn vị tính:
              </span>
              <input
                id="medicineUnitInput"
                type="text"
                className="border-[#B4B4B4] rounded-lg h-8 border pl-4"
                placeholder="Nhập đơn vị tính"
                value={inputUnit}
                onChange={(e) => setInputUnit(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-row justify-start gap-20">
            <div className="flex flex-col justify-start w-1/3">
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
            <div className="flex flex-col justify-start w-1/3">
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
              id="medicineUsesageInput"
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
              id="medicineDosageInput"
              type="text"
              className="border-[#B4B4B4] rounded-lg h-8 border pl-4 pr-2 pt-1"
              value={inputDosage}
              placeholder="Nhập liều dùng"
              onChange={(e) => setInputDosage(e.target.value)}
            />
          </div>

          <LargeRoundedCornerButton
            className="large-rounded-corner-button px-5 py-1 self-end"
            text="Lưu"
            variant="primary"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default EditMedicinePage;
