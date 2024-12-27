import { React, useState } from "react";
import { toast } from "react-toastify";
import LargeRoundedCornerButton from "../../components/layout/LargeRoundedCornerButton";
import "../../styles/LargeRoundedCornerButton.css";

const AddSupplierPage = () => {
  const [inputName, setInputName] = useState("");

  const handleCreateNewSupplier = (e) => {
    e.preventDefault(); 
    if (!inputName.trim()) {
      alert("Vui lòng nhập tên nhà cung cấp!");
    } else {
      toast.success("Tạo nhà cung cấp mới thành công");
      console.log("Tạo nhà cung cấp mới thành công");
    }
  };

  return (
    <div className="flex flex-row gap-5 mt-7 mr-16">
      <div className="w-1/6 ml-6">//Admin nav</div>
      <div className="w-5/6 mr-6">
        <div className="display flex flex-row justify-between mb-7 ">
          <span className="uppercase font-medium text-2xl h-auto w-auto text-[#2A2A2A] font-raleway">
            Tạo nhà cung cấp mới
          </span>
        </div>

        {/* Add Supplier Layout */}
        <form
          onSubmit={handleCreateNewSupplier}
          className="flex flex-col gap-8"
        >
          <div className="display flex flex-row justify-start">
            <span className="font-normal text-xl h-auto text-[#2A2A2A] font-work-sans w-1/4">
              Mã nhà cung cấp:
            </span>
            <p className="border-[#B4B4B4] rounded-lg h-8 w-fit border px-4 pt-1 bg-[#B4B4B4]">
              NCC001
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
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
          </div>
          <LargeRoundedCornerButton
            className="large-rounded-corner-button px-5 py-1 self-end"
            text="Tạo nhà cung cấp mới"
            variant="primary"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default AddSupplierPage;
