import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuOptions from '../../components/layout/MenuOptions';
import { menuOptions } from '../../data/menuOptionsData';
import useMenuOptionHandler from '../../components/layout/menuOptionHandlers';
import userData from '../../data/userData';
import LargeRoundedCornerButton from "../../components/layout/LargeRoundedCornerButton";

const AddUserPage = () => {
  const [userRole, setUserRole] = useState("");
  const [activeOption, setActiveOption] = useState("users");

  const { handleOptionClick } = useMenuOptionHandler(setActiveOption);

  const navigate = useNavigate();

  const handleCreateInvoice = () => {
    sessionStorage.setItem("userSuccessMessage", "Người dùng đã được tạo thành công!");
    navigate('/admin/user');
  };

  return (
    <div className="flex flex-row gap-5 mt-7 font-sans">
        <div className="w-1/6 ml-6">
            {/* MenuOptions bên trái */}
            <MenuOptions
            options={menuOptions}
            activeOption={activeOption}
            onOptionClick={handleOptionClick}
            />
        </div>

        <div className="w-5/6 mr-6">
            <div className="flex justify-between items-center mt-10">
            <span className="uppercase font-medium text-2xl text-[#2A2A2A] mb-7 font-raleway">
                THÊM NGƯỜI DÙNG
            </span>
            </div>

            <div className="space-y-4">
            <div className="flex space-x-4">
                <div className="flex-1">
                <label className="block font-semibold mb-1">Mã người dùng:</label>
                <input
                    type="text"
                    value="ND001"
                    disabled
                    className="w-full p-2 border rounded-md bg-gray-100"
                />
                </div>
                    <div className="flex-1">
                    <label className="block font-semibold mb-1">Tên người dùng:</label>
                    <input
                        type="text"
                        placeholder="Nhập tên người dùng"
                        className="w-full p-2 border rounded-md"
                    />
                    </div>
                </div>

                <div>
                    <label className="block font-semibold mb-1">Vai trò:</label>
                    <select
                        id="role"
                        name="role"
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value)}
                        className="block w-1/3 p-2 border rounded-md"
                    >
                    <option value="admin">Admin</option>
                    <option value="doctor">Bác sĩ</option>
                    <option value="patient">Bệnh nhân</option>
                    </select>
                </div>
                <div className="flex justify-end mt-4">
                    <LargeRoundedCornerButton
                        className="large-rounded-corner-button py-1 px-5"
                        text="Thêm người dùng mới"
                        variant="primary"
                        onClick={handleCreateInvoice}
                    />
                </div>
            </div>
        </div>
    </div>
  );
};

export default AddUserPage;
