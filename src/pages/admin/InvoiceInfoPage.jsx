import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import invoiceData from "../../data/invoiceData";
import MenuOptions from "../../components/layout/MenuOptions";
import { menuOptions } from "../../data/menuOptionsData";
import useMenuOptionHandler from "../../components/layout/menuOptionHandlers";

const InvoiceInfoPage = () => {
  const [activeOption, setActiveOption] = useState("invoices");
  const { handleOptionClick } = useMenuOptionHandler(setActiveOption);
  const { invoiceID } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    console.log(invoiceData);  // Check if invoice data is available
    const foundInvoice = invoiceData.find((invoice) => invoice.invoiceID === invoiceID);
    if (foundInvoice) {
      setInvoice(foundInvoice);
    } else {
      setInvoice(null);  // Handle the case where no invoice is found
    }
  }, [invoiceID]);

  if (!invoice) {
    return <p>Invoice not found.</p>;  // Display if no invoice is found
  }

  return (
    <div className="flex flex-row gap-5 mt-7">
      <div className="w-1/6 ml-6">
        {/* MenuOptions on the left */}
        <MenuOptions
          options={menuOptions}
          activeOption={activeOption}
          onOptionClick={handleOptionClick}
        />
      </div>
      <div className="w-5/6 mr-6">
        <div className="flex flex-row gap-5 mt-5 mb-7 items-center">
          <span className="uppercase font-medium text-2xl text-[#2A2A2A] font-raleway">
            Chi tiết hóa đơn
          </span>
        </div>

        {/* Display invoice information */}
        <div className="grid grid-cols-4 border border-[#B4B4B4]">
          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p className="text-xl">Mã hóa đơn:</p>
          </div>
          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p className="text-xl">{invoice.invoiceID}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Tên bệnh nhân:</p>
          </div>
          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{invoice.patientName}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Ngày lập:</p>
          </div>
          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{invoice.invoiceDate}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Chi tiết dịch vụ:</p>
          </div>
          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{invoice.serviceDetails}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Tạm tính:</p>
          </div>
          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{invoice.subtotal}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Giảm giá:</p>
          </div>
          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{invoice.discount}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Tổng:</p>
          </div>
          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{invoice.total}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Trạng thái:</p>
          </div>
          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{invoice.invoiceStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceInfoPage;
