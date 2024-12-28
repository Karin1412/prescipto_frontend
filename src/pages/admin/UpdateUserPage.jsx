import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MenuOptions from "../../components/layout/MenuOptions";
import { menuOptions } from "../../data/menuOptionsData";
import useMenuOptionHandler from "../../components/layout/menuOptionHandlers";
import userData from "../../data/userData";
import LargeRoundedCornerButton from "../../components/layout/LargeRoundedCornerButton";

const UpdateUserPage = () => {
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [status, setStatus] = useState("");
  const [activeOption, setActiveOption] = useState("users");
  
  // Lấy userID từ URL
  const { userId } = useParams();
  const navigate = useNavigate();
  
  // Tìm kiếm thông tin người dùng từ userData dựa trên userID
  useEffect(() => {
    const user = userData.find((u) => u.userID === userId);
    if (user) {
      setUserID(user.userID);
      setUserName(user.userName);
      setUserRole(user.userRole);
      setStatus(user.userStatus);
    }
  }, [userId]);

  const { handleOptionClick } = useMenuOptionHandler(setActiveOption);

  // Xử lý khi lưu thông tin người dùng
  const handleSave = (e) => {
    e.preventDefault();
    // Cập nhật người dùng ở đây (lưu vào database hoặc local storage)
    console.log("Cập nhật thông tin người dùng", { userID, userName, userRole, status });
    sessionStorage.setItem("userSuccessMessage", "Người dùng đã được cập nhật thành công!");
    navigate("/admin/user");
  };

  if (!userID) {
    return <div>Đang tải thông tin người dùng...</div>;
  }

  return (
    <div className="flex flex-row gap-5 mt-7 font-sans">
      {/* Menu bên trái */}
      <div className="w-1/6 ml-6">
        <MenuOptions
          options={menuOptions}
          activeOption={activeOption}
          onOptionClick={handleOptionClick}
        />
      </div>

      {/* Nội dung chính */}
      <div className="w-5/6 mr-6">
        <div className="flex flex-row gap-5 mb-7 mt-5">
          <span className="uppercase font-medium text-2xl text-[#2A2A2A] font-raleway">
            Cập nhật người dùng
          </span>
        </div>

        {/* Form Update User */}
        <form onSubmit={handleSave} className="flex flex-col gap-8">
          {/* Mã người dùng */}
          <div className="flex flex-row justify-start">
            <span className="font-normal text-xl text-[#2A2A2A] font-work-sans w-1/4">
              Mã người dùng:
            </span>
            <p className="border-[#B4B4B4] rounded-lg h-8 border px-4 pt-1 bg-[#B4B4B4]">
              {userID}
            </p>
          </div>

          {/* Tên người dùng */}
          <div className="flex flex-row justify-start">
            <span className="font-normal text-xl text-[#2A2A2A] font-work-sans w-1/4">
              Tên người dùng:
            </span>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)} // Cập nhật tên người dùng
              placeholder="Nhập tên người dùng"
              className="border-[#B4B4B4] rounded-lg h-8 border pl-4 w-1/2"
            />
          </div>

          {/* Vai trò người dùng */}
          <div className="flex flex-row justify-start">
            <span className="font-normal text-xl text-[#2A2A2A] font-work-sans w-1/4">
              Vai trò:
            </span>
            <select
              className="border-[#B4B4B4] rounded-lg h-8 border px-4 w-fit"
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)} // Cập nhật vai trò
            >
              <option value="admin">Admin</option>
              <option value="doctor">Bác sĩ</option>
              <option value="patient">Bệnh nhân</option>
            </select>
          </div>

          {/* Trạng thái người dùng */}
          <div className="flex flex-row justify-start">
            <span className="font-normal text-xl text-[#2A2A2A] font-work-sans w-1/4">
              Trạng thái:
            </span>
            <select
              className="border-[#B4B4B4] rounded-lg h-8 border px-4 w-fit"
              value={status}
              onChange={(e) => setStatus(e.target.value)} // Cập nhật trạng thái
            >
              <option value="Đang hoạt động">Đang hoạt động</option>
              <option value="Dừng hoạt động">Dừng hoạt động</option>
            </select>
          </div>

          {/* Nút lưu */}
          <div className="flex justify-end mt-4">
            <LargeRoundedCornerButton
              className="large-rounded-corner-button px-10 py-1 self-end"
              text="Lưu"
              variant="primary"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserPage;
