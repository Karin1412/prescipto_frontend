import { React, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import LargeRoundedCornerButton from "../../components/layout/LargeRoundedCornerButton";
import "../../styles/LargeRoundedCornerButton.css";
import suppliersData from "../../data/suppliersData";
import drugsData from "../../data/drugsData";
import { useNavigate } from "react-router-dom";

const AddDrugToGoodsReceiptNotePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSupplier, importDate } = location.state || {};
  const [isAddAvailableDrugFormVisible, setIsAddAvailableDrugFormVisible] =
    useState(true);
  const [inputName, setInputName] = useState("");
  const [inputNewDrugImportPrice, setInputNewDruImportPrice] = useState();
  const [inputNewDrugSellingPrice, setInputNewDruSellingPrice] = useState();
  const [inputUnit, setInputUnit] = useState("");
  const [inputNewDrugQuantity, setInputNewDrugQuantity] = useState();
  const [inputAvailableDrugQuantity, setInputAvailableDrugQuantity] =
    useState();
  const [inputNewDrugExpiryDate, setInputNewDrugExpiryDate] = useState("");
  const [inputAvailableDrugExpiryDate, setInputAvailableDrugExpiryDate] =
    useState("");
  const [inputUsesage, setInputUsesage] = useState("");
  const [inputDosage, setInputDosage] = useState("");
  const [supplier, setSupplier] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState("");

  if (!selectedSupplier || !importDate) {
    return (
      <p className="mt-6 mx-6">
        Dữ liệu không hợp lệ. Vui lòng quay lại và nhập đầy đủ thông tin.
      </p>
    );
  }

  useEffect(() => {
    const findSupplierAndDrugs = () => {
      const currentSupplier = suppliersData.find(
        (sup) => sup.id === selectedSupplier
      );

      if (currentSupplier) {
        setSupplier(currentSupplier);
        const supplierDrugs = drugsData.filter(
          (drug) => drug.supplierId === currentSupplier.id
        );

        if (supplierDrugs.length > 0) {
          setDrugs(supplierDrugs);
        }
      }
    };

    findSupplierAndDrugs();
  }, []);

  const toggleVisibility = () => {
    setIsAddAvailableDrugFormVisible(!isAddAvailableDrugFormVisible);
  };

  const handleDrugChange = (event) => {
    setSelectedDrug(event.target.value);
  };

  const isValidForm = () => {
    if (!inputName.trim()) {
      alert("Vui lòng nhập tên thuốc.");
      return false;
    }

    if (isAddAvailableDrugFormVisible) {
      if (
        !inputAvailableDrugQuantity ||
        isNaN(Number(inputAvailableDrugQuantity)) ||
        !Number.isInteger(inputAvailableDrugQuantity) ||
        Number(inputAvailableDrugQuantity) <= 0
      ) {
        alert("Số lượng phải là số số nguyên và lớn hơn 0.");
        return false;
      }

      if (new Date(importDate) >= new Date(inputAvailableDrugExpiryDate)) {
        alert("Hạn sử dụng phải sau ngày nhập.");
        return false;
      }
    } else {
      if (
        !inputNewDrugImportPrice ||
        isNaN(Number(inputNewDrugImportPrice)) ||
        Number(inputNewDrugImportPrice) <= 0
      ) {
        alert("Giá nhập phải là số hợp lệ và lớn hơn 0.");
        return false;
      }

      if (
        !inputNewDrugSellingPrice ||
        isNaN(Number(inputNewDrugSellingPrice)) ||
        Number(inputNewDrugSellingPrice) <= 0
      ) {
        alert("Giá bán phải là số hợp lệ và lớn hơn 0.");
        return false;
      }

      if (
        !inputNewDrugQuantity ||
        isNaN(Number(inputNewDrugQuantity)) ||
        !Number.isInteger(inputNewDrugQuantity) ||
        Number(inputNewDrugQuantity) <= 0
      ) {
        alert("Số lượng phải là số số nguyên và lớn hơn 0.");
        return false;
      }

      if (new Date(importDate) >= new Date(inputNewDrugExpiryDate)) {
        alert("Hạn sử dụng phải sau ngày nhập.");
        return false;
      }
    }

    if (!inputUnit.trim()) {
      alert("Vui lòng nhập đơn vị tính.");
      return false;
    }

    if (!importDate) {
      alert("Vui lòng nhập ngày nhập.");
      return false;
    }

    if (isAddAvailableDrugFormVisible) {
      if (!inputAvailableDrugExpiryDate) {
        alert("Vui lòng nhập hạn sử dụng.");
        return false;
      }
    } else {
      if (!inputNewDrugExpiryDate) {
        alert("Vui lòng nhập hạn sử dụng.");
        return false;
      }
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

  const handleCreateNewDrugAndAddToGoodsReceiptNote = (e) => {
    e.preventDefault();
    if (isValidForm()) {
      if (isAddAvailableDrugFormVisible) {
        // Add to Goods Receipt Note
        toast.success("Thêm vào phiếu nhập thành công");
      } else {
        //Create new drug and to Goods Receipt Note
        toast.success("Tạo thuốc mới và thêm vào phiếu nhập thành công");
      }

      //cộng vào tổng tiền

      
      navigate("/admin/goods-receipt-note/add", {});
    }
  };

  const handleAddAvailableDrugToGoodsReceiptNote = () => {};

  return (
    <div className="flex flex-row gap-5 mt-7 mr-16">
      <div className="w-1/6 ml-6">//Admin nav</div>

      {/*  Add Available Drug To Goods Receipt Note */}
      <div
        className={`w-3/4 -5/6 mr-6 transition-all duration-300 ${
          isAddAvailableDrugFormVisible ? "block" : "hidden"
        }`}
      >
        <div className="display flex flex-row mb-7 gap-5">
          <span className="uppercase font-medium text-2xl h-auto w-auto text-[#2A2A2A] font-raleway">
            Thêm thuốc vào phiếu nhập kho
          </span>
          <LargeRoundedCornerButton
            className="large-rounded-corner-button px-5 py-1"
            text="Thêm thuốc đã có sẵn vào phiếu"
            variant="primary"
            onClick={toggleVisibility}
          />
        </div>

        <form
          onSubmit={handleAddAvailableDrugToGoodsReceiptNote}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-row justify-between">
            <div className="flex flex-col w-1/3">
              <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                Tên thuốc:
              </span>
              <select
                id="drug-select"
                type="text"
                className="border-[#B4B4B4] rounded-lg h-8 border px-4"
                value={selectedDrug}
                onChange={handleDrugChange}
              >
                <option value="" disabled>
                  -- Chọn một loại thuốc --
                </option>
                {drugs.map((drug) => (
                  <option key={drug.id} value={drug.id}>
                    {drug.id} - {drug.drugName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-row justify-start gap-20">
            <div className="flex flex-col justify-start w-1/3">
              <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                Ngày nhập:
              </span>
              <p className="border-[#B4B4B4] bg-[#B4B4B4] rounded-lg h-8 border px-4 pt-1">
                {" "}
                {importDate}{" "}
              </p>
            </div>

            <div className="flex flex-col w-1/3">
              <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                Hạn sử dụng:
              </span>
              <input
                type="date"
                className="border-[#B4B4B4] rounded-lg h-8 border pl-4 pr-2"
                value={inputAvailableDrugExpiryDate}
                onChange={(e) =>
                  setInputAvailableDrugExpiryDate(e.target.value)
                }
              />
            </div>

            <div className="flex flex-col w-1/3">
              <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                Số lượng:
              </span>
              <input
                type="text"
                className="border-[#B4B4B4] rounded-lg h-8 border pl-4"
                placeholder="Nhập số lượng"
                value={inputAvailableDrugQuantity}
                onChange={(e) => setInputAvailableDrugQuantity(e.target.value)}
              />
            </div>
          </div>

          <LargeRoundedCornerButton
            className="large-rounded-corner-button px-5 py-1 self-end"
            text="Thêm thuốc vào phiếu"
            variant="primary"
            type="submit"
          />
        </form>
      </div>

      {/* Create New Drug And Add To Goods Receipt Note */}
      <div
        className={`w-3/4 -5/6 mr-6 transition-all duration-300 ${
          isAddAvailableDrugFormVisible ? "hidden" : "block"
        }`}
      >
        <div className="display flex flex-row mb-7 gap-5">
          <span className="uppercase font-medium text-2xl h-auto w-auto text-[#2A2A2A] font-raleway">
            Tạo thuốc mới và thêm vào phiếu nhập kho
          </span>
          <LargeRoundedCornerButton
            className="large-rounded-corner-button px-5 py-1"
            text="Thêm thuốc đã có sẵn vào phiếu"
            variant="primary"
            onClick={toggleVisibility}
          />
        </div>

        <form
          onSubmit={handleCreateNewDrugAndAddToGoodsReceiptNote}
          className="flex flex-col gap-8"
        >
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
              <p className="border-[#B4B4B4] bg-[#B4B4B4] rounded-lg h-8 border px-4 pt-1">
                {" "}
                {supplier.supplierName}{" "}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-start gap-20">
            <div className="flex flex-col justify-start w-1/4">
              <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                Giá nhập:
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="border-[#B4B4B4] rounded-lg h-8 border pl-4"
                  placeholder="Nhập giá nhập"
                  value={inputNewDrugImportPrice}
                  onChange={(e) => setInputNewDruImportPrice(e.target.value)}
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
                  type="text"
                  className="border-[#B4B4B4] rounded-lg h-8 border pl-4"
                  placeholder="Nhập giá bán"
                  value={setInputNewDruSellingPrice}
                  onChange={(e) => setInputNewDruSellingPrice(e.target.value)}
                />
                <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                  VND
                </span>
              </div>
            </div>
            <div className="flex flex-col w-1/4">
              <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                Số lượng:
              </span>
              <input
                type="text"
                className="border-[#B4B4B4] rounded-lg h-8 border pl-4"
                placeholder="Nhập số lượng"
                value={inputNewDrugQuantity}
                onChange={(e) => setInputNewDrugQuantity(e.target.value)}
              />
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
              <p className="border-[#B4B4B4] bg-[#B4B4B4] rounded-lg h-8 border px-4 pt-1">
                {" "}
                19/11/2023{" "}
              </p>
            </div>
            <div className="flex flex-col w-1/4">
              <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans mb-2">
                Hạn sử dụng:
              </span>
              <input
                type="date"
                className="border-[#B4B4B4] rounded-lg h-8 border pl-4 pr-2"
                value={inputNewDrugExpiryDate}
                onChange={(e) => setInputNewDrugExpiryDate(e.target.value)}
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

          <LargeRoundedCornerButton
            className="large-rounded-corner-button px-5 py-1 self-end"
            text="Tạo thuốc mới và thêm vào phiếu"
            variant="primary"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default AddDrugToGoodsReceiptNotePage;
