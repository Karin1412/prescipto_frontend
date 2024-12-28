import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import userData from "../../data/userData";
import ItemActionButton from "../../components/layout/ItemActionButton";
import "../../styles/ItemActionButton.css";
import MenuOptions from "../../components/layout/MenuOptions";
import { menuOptions } from "../../data/menuOptionsData";
import useMenuOptionHandler from "../../components/layout/menuOptionHandlers";

const UserInfoPage = () => {
  const [activeOption, setActiveOption] = useState("users"); 
  const { handleOptionClick } = useMenuOptionHandler(setActiveOption); 
  const { userID } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const foundUser = userData.find((user) => user.userID === userID);
    setUser(foundUser);
  }, [userID]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleDeleteUser = () => {
    console.log("Delete User ID:", userID);
    // Handle deletion logic here
  };

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
        <div className="flex flex-row gap-5 mb-7 items-center">
          <span className="uppercase font-medium text-2xl text-[#2A2A2A] font-raleway">
            Chi tiết người dùng
          </span>
          <Link to={`/admin/user/edit/${user.userID}`}>
            <ItemActionButton
              className="item-action-button p-1 h-9 w-9"
              img="/src/assets/Edit.svg"
              variant="secondary"
            />
          </Link>
          <ItemActionButton
            className="item-action-button p-1 h-9 w-9"
            onClick={handleDeleteUser}
            img="/src/assets/Trash.svg"
            variant="danger"
          />
        </div>

        {/* Display user information */}
        <div className="grid grid-cols-4 border border-[#B4B4B4]">
          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p className="text-xl">Mã người dùng:</p>
          </div>
          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p className="text-xl">{user.userID}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Tên người dùng:</p>
          </div>
          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{user.userName}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Vai trò:</p>
          </div>
          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{user.userRole}</p>
          </div>

          <div className="col-span-1 p-4 border border-[#B4B4B4]">
            <p>Trạng thái:</p>
          </div>
          <div className="col-span-3 p-4 border border-[#B4B4B4]">
            <p>{user.userStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoPage;
