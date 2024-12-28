import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuOptions from '../../components/layout/MenuOptions.jsx';
import userData from '../../data/userData.jsx';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import ItemActionButton from "../../components/layout/ItemActionButton.jsx";
import "../../styles/ItemActionButton.css";
import "../../styles/Popup.css";
import { menuOptions } from '../../data/menuOptionsData.jsx';
import useMenuOptionHandler from '../../components/layout/menuOptionHandlers.jsx';
import LargeRoundedCornerButton from "../../components/layout/LargeRoundedCornerButton.jsx";
import "../../styles/LargeRoundedCornerButton.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const UserManagementPage = () => {
  const [users, setUsers] = useState(userData); 
  const [searchQuery, setSearchQuery] = useState('');
  const [activeOption, setActiveOption] = useState('users');
  const [showDetelePopup, setShowDetelePopup] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const { handleOptionClick } = useMenuOptionHandler(setActiveOption);

  React.useEffect(() => {
      const successMessage = sessionStorage.getItem("userSuccessMessage");
      if (successMessage) {
        toast.success(successMessage);
        sessionStorage.removeItem("userSuccessMessage");
      }
    }, []);

    useEffect(() => {
        setUsers(userData);
      }, []);

      const deleteUserHandle = (userID) => {
        setUserToDelete(userID);
        setShowDetelePopup(true);
      };

      const handleDeletionConfirmation = () => {
        const updatedUsers = userData.map((user) => {
          if (user.userID === userToDelete) {
            return { ...user, userStatus: "Dừng hoạt động" };
          }
          return user;
        });
        setUsers(updatedUsers); // Corrected state update function
        console.log("Người dùng đã được xóa");
        toast.success("Người dùng đã được xóa");
      
        setShowDetelePopup(false);
        setUserToDelete(null); // Corrected variable name
      };
      

  const handleDeletionCancel = () => {
    setShowDetelePopup(false);
    setSuppilerToDelete(null);
    console.log("Xóa người dùng đã bị hủy");
  };
      
  const columnDefs = [
    {
        headerName: "#",
        valueGetter: (params) => params.node.rowIndex + 1,
        sortable: false,
        filter: false,
        resizable: true,
        cellClass: "flex items-center justify-center",
        width: 60, // Adjust width to fit content
    },
    {
      headerName: "Mã người dùng",
      field: "userID",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "flex items-center justify-center",
      flex: 1, // Make this column flexible
    },
    {
      headerName: "Tên người dùng",
      field: "userName",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "flex items-center justify-center",
      flex: 1, // Make this column flexible
    },
    {
      headerName: "Vai trò",
      field: "userRole",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "flex items-center justify-center",
      flex: 1, // Make this column flexible
    },
    {
      headerName: "Trạng thái",
      field: "userStatus",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "flex items-center justify-center",
      cellStyle: (params) => {
        let color;
        switch (params.value) {
          case "Đang hoạt động":
            color = "#4CAF50"; // Green for active
            break;
          case "Dừng hoạt động":
            color = "#FF5722"; // Orange for inactive
            break;
          default:
            color = "black";
        }
        return { color };
      },
      flex: 1, // Make this column flexible
    },
    {
      headerName: "Hành động",
      field: "userID",
      minWidth: 120, // Ensure this column has enough space
      cellRenderer: (params) => (
        <div className="flex">
          <Link to={`/admin/user/${params.data.userID}`}>
            <ItemActionButton
              img="/src/assets/Information Circle Contained.svg"
              variant="primary"
              className="item-action-button h-6 w-6 m-2 p-1"
            />
          </Link>
          <Link to={`/admin/user/edit/${params.data.userID}`}>
            <ItemActionButton
              img="/src/assets/Edit.svg"
              variant="secondary"
              className="item-action-button h-6 w-6 m-2 p-1"
            />
          </Link>
          <ItemActionButton
            img="/src/assets/Trash.svg"
            variant="danger"
            className="item-action-button h-6 w-6 m-2 p-1"
            onClick={() => deleteUserHandle(params.data.userID)}
          />
        </div>
      ),
      cellClass: "flex items-center justify-center",
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.userID.includes(searchQuery) ||
      user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.userRole.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit(); // Automatically adjust column sizes based on content
  };

  return (
    <div className="flex flex-row gap-5 mt-7">
      <div className="w-1/6 ml-6">
        <MenuOptions
          options={menuOptions}
          activeOption={activeOption}
          onOptionClick={handleOptionClick}
        />
      </div>

      <div className="w-5/6 mr-6">
        <div className="flex justify-between items-center mt-10">
          <span className="uppercase font-medium text-2xl text-[#2A2A2A] mb-7 font-raleway">
            DANH SÁCH NGƯỜI DÙNG
          </span>
        </div>

        <div className="flex justify-between items-center mb-4">
          <Link to="/admin/user/add">
            <LargeRoundedCornerButton
              className="large-rounded-corner-button py-1 px-5"
              text="Thêm người dùng"
              variant="primary"
            />
          </Link>

          <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-[#B4B4B4] border-2 rounded-lg h-8 w-60 pl-4"
            placeholder="Tìm kiếm"
          />
        </div>

        <div className="container">
          <div className="ag-theme-alpine bg-white rounded-lg shadow-md h-[500px]">
            {filteredUsers && filteredUsers.length > 0 ? (
              <AgGridReact
                columnDefs={columnDefs}
                rowData={filteredUsers}
                pagination={true}
                paginationPageSize={10}
                rowHeight={60}
                quickFilterText={searchQuery}
                suppressHorizontalScroll={true}
                onFirstDataRendered={onFirstDataRendered}
              />
            ) : (
              <p>Không có người dùng nào để hiển thị.</p>
            )}
          </div>
        </div>
        {/* Delete Supplier Popup */}
        {showDetelePopup && (
            <div className="popup-overlay">
              <div className="popup">
                <div className="popup-header">
                  <h2>Bạn có chắc chắn muốn xóa?</h2>
                  <button
                    className="close-button"
                    onClick={handleDeletionCancel}
                  >
                    <img src="/src/assets/X black.svg" alt="Close" />
                  </button>
                </div>
                <p>Người dùng sẽ trở về trạng thái "Dừng hoạt động".</p>
                <div className="button-group">
                  <button className="no-button" onClick={handleDeletionCancel}>
                    Không
                  </button>
                  <button
                    className="yes-button"
                    onClick={handleDeletionConfirmation}
                  >
                    Có
                  </button>
                </div>
              </div>
            </div>
            )}
      </div>
    </div>
  );
};

export default UserManagementPage;
