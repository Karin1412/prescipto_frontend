import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import goodsReceiptNotesData from "../../data/goodsReceiptNotesData";
import suppliersData from "../../data/suppliersData";
import ItemActionButton from "../../components/layout/ItemActionButton";
import "../../styles/ItemActionButton.css";
import "../../styles/Popup.css";
import { Link } from "react-router-dom";
import LargeRoundedCornerButton from "../../components/layout/LargeRoundedCornerButton";
import "../../styles/LargeRoundedCornerButton.css";

// Đăng ký module ClientSideRowModelModule
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const GoodsReceiptNoteManagementPage = () => {
  const [goodsReceiptNotes, setGoodsReceiptNotes] = useState([]);
  const [quickFilterText, setQuickFilterText] = useState("");

  const handleImportGoodsReceiptNoteByExcel = () => {
    //Import Goods Receipt Note By Excel
    toast.success("Nhập dữ liệu thành công!");
  };

  useEffect(() => {
    const combineData = () => {
      const combinedGoodsReceiptNotes = goodsReceiptNotesData.map(
        (goodsReceiptNote) => ({
          ...goodsReceiptNote,
          suppiler: suppliersData.find(
            (sup) => sup.id === goodsReceiptNote.supplierId
          ),
        })
      );
      setGoodsReceiptNotes(combinedGoodsReceiptNotes);
    };

    combineData();
  }, []);

  const columnDefs = [
    {
      headerName: "Mã phiếu nhập",
      field: "id",
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: "Tổng tiền",
      field: "totalCost",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: "Ngày nhập",
      field: "importDate",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: "Nhà cung cấp",
      field: "supplierName",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: "Hành động",
      field: "actions",
      cellRenderer: (params) => (
        <div className="flex">
          <Link to={`/admin/goods-receipt-note/${params.data.id}`}>
            <ItemActionButton
              img="/src/assets/Information Circle Contained.svg"
              variant="primary"
              className="item-action-button h-6 w-6 m-2 p-1"
            />
          </Link>
        </div>
      ),
      resizable: true,
    },
  ];

  const rowData = goodsReceiptNotes.map((goodsReceiptNote) => ({
    id: goodsReceiptNote.id,
    totalCost: "1.000.000.000 VND",
    importDate: goodsReceiptNote.importDate,
    supplierName: goodsReceiptNote.suppiler?.supplierName,
  }));

  return (
    <div className="flex flex-row gap-5 mt-7">
      <div className="w-1/6 ml-6">//Admin nav</div>
      <div className="w-5/6 mr-6">
        <div className="display flex flex-row justify-between">
          <span className="uppercase font-medium text-2xl h-auto w-auto text-[#2A2A2A] mb-7 font-raleway">
            Danh sách Phiếu nhập kho
          </span>
        </div>

        {/* Supplier List */}
        <div className="container">
          <div className="flex justify-between mb-4 items-center">
            <div className="flex justify-between items-center">
              <h1 className="size-6 w-auto uppercase text-[#2A2A2A]">
                {goodsReceiptNotes.length} Phiếu nhập kho
              </h1>
              <Link to="/admin/goods-receipt-note/add">
                <LargeRoundedCornerButton
                  className="large-rounded-corner-button py-1 px-5 mx-5"
                  text="Tạo phiếu nhập mới"
                  variant="primary"
                />
              </Link>
              <ItemActionButton
                img="/src/assets/Excel.svg"
                variant="secondary"
                className="item-action-button h-9 w-9"
                onClick={handleImportGoodsReceiptNoteByExcel}
              />
            </div>

            <input
              type="text"
              onChange={(e) => setQuickFilterText(e.target.value)}
              className="border-[#B4B4B4] rounded-lg h-8 border w-60 pl-4"
              placeholder="Tìm kiếm"
            />
          </div>
          <div className="ag-theme-quartz h-[600px]">
            {rowData && rowData.length > 0 ? (
              <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                rowModelType="clientSide"
                domLayout="normal"
                quickFilterText={quickFilterText}
                pagination={true}
                paginationPageSize={10}
                rowHeight={60}
              />
            ) : (
              <p>Không có phiếu nhập nào để hiển thị.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodsReceiptNoteManagementPage;
