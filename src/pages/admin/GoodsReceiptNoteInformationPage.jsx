import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import goodsReceiptNotesData from "../../data/goodsReceiptNotesData";
import goodsReceiptNoteDetailsData from "../../data/goodsReceiptNoteDetailsData";
import suppliersData from "../../data/suppliersData";
import drugsData from "../../data/drugsData";
import "../../styles/ItemActionButton.css";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";

// Đăng ký module ClientSideRowModelModule
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const GoodsReceiptNoteInformationPage = () => {
  // Get the current supplier ID
  const { id } = useParams();
  const [goodsReceiptNotes, setGoodsReceiptNotes] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [quickFilterText, setQuickFilterText] = useState("");

  useEffect(() => {
    const combineData = () => {
      const currentGoodsReceiptNote = goodsReceiptNotesData.find(
        (gRN) => gRN.id === id
      );

      //Find Supplier
      if (currentGoodsReceiptNote) {
        const supplier = suppliersData.find(
          (sup) => sup.id === currentGoodsReceiptNote.supplierId
        );

        const combinedGoodsReceiptNote = {
          ...currentGoodsReceiptNote,
          supplier: supplier ? supplier : null,
        };

        setGoodsReceiptNotes(combinedGoodsReceiptNote);
      }
    };

    combineData();
  }, []);


  const columnDefs = [
    {
      headerName: "Mã thuốc",
      field: "id",
      sortable: true,
      filter: true,
      resizable: true,
      width: 100,
    },
    {
      headerName: "Tên thuốc",
      field: "drugName",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: "Hạn sử dụng",
      field: "expiryDate",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "grid-cell-centered",
      width: 120,
    },
    {
      headerName: "Số lượng",
      field: "quantity",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "grid-cell-centered",
      width: 100,
    },
    {
      headerName: "Đơn vị",
      field: "unit",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "grid-cell-centered",
      width: 100,
    },
    {
      headerName: "Giá nhập",
      field: "importPrice",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "grid-cell-centered",
      width: 150,
    },
    {
      headerName: "Tổng giá nhập",
      field: "totalImportPrice",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "grid-cell-centered",
      width: 150,
    },
  ];

  const rowData = drugs.map((drug) => ({
    id: drug.id,
    drugName: drug.drugName,
    expiryDate: drug.expiryDate,
    quantity: drug.quantity,
    unit: drug.unit,
    importPrice: drug.importPrice + " VND",
    totalImportPrice: drug.importPrice * drug.quantity + " VND",
  }));

  return (
    <div className="flex flex-row gap-5 mt-7 mr-16">
      <div className="w-1/6 ml-6">//Admin nav</div>
      <div className="w-5/6 mr-6">
        <div className="display flex flex-row gap-5 mb-7 items-center">
          <span className="uppercase font-medium text-2xl h-auto w-auto text-[#2A2A2A] font-raleway">
            Chi tiết phiếu nhập
          </span>
        </div>

        {/*Display goods receipt note information*/}
        <div className="grid grid-cols-4 border border-[#B4B4B4] my-6">
          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p className="text-xl">Mã phiếu nhập:</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p className="text-xl">{goodsReceiptNotes.id}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Tên nhà cung cấp:</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{goodsReceiptNotes.supplier?.supplierName}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Ngày nhập:</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{goodsReceiptNotes.importDate}</p>
          </div>
          
          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Tổng tiền:</p>
          </div>

          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{goodsReceiptNotes.totalPrice} VND</p>
          </div>
        </div>

        {/*Display drug list*/}
        <div className="container">
          <div className="flex justify-between mb-4 items-center">
            <h1 className="size-6 w-auto uppercase text-[#2A2A2A]">
              {drugs.length} Thuốc
            </h1>

            <input
              type="text"
              onChange={(e) => setQuickFilterText(e.target.value)}
              className="border-[#B4B4B4] rounded-lg h-8 border w-60 pl-4"
              placeholder="Tìm kiếm"
            />
          </div>
          <div className="ag-theme-quartz h-[360px]">
            {rowData && rowData.length > 0 ? (
              <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                rowModelType="clientSide"
                domLayout="normal"
                quickFilterText={quickFilterText}
                pagination={true}
                paginationPageSize={5}
                rowHeight={60}
              />
            ) : (
              <p>Không có thuốc nào để hiển thị.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodsReceiptNoteInformationPage;
