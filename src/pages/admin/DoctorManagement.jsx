import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ItemActionButton from "../../components/layout/ItemActionButton";
import "../../styles/ItemActionButton.css";
import MenuOptions from "../../components/layout/MenuOptions";
import { menuOptions } from "../../data/menuOptionsData";
import useMenuOptionHandler from "../../components/layout/menuOptionHandlers";

const DoctorManagementPage = () => {
  const [activeOption, setActiveOption] = useState("doctors");
  const { handleOptionClick } = useMenuOptionHandler(setActiveOption);
  const [doctors, setDoctors] = useState([]);

  // Fetch doctor data from backend API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/doctors"); // Replace with your API URL
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleDeleteDoctor = (id) => {
    console.log("Delete Doctor ID:", id);
    // Handle delete doctor logic
    setDoctors(doctors.filter((doctor) => doctor._id !== id)); // Remove deleted doctor from state
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
        <div className="flex flex-row justify-between items-center mb-7 mt-5">
          <span className="uppercase font-medium text-2xl text-[#2A2A2A] font-raleway">
            Quản lý bác sĩ
          </span>
        </div>

        {/* Doctor List */}
        <div className="overflow-x-auto">
          <div className="ag-theme-quartz">
            {/* Table Header */}
            <div className="grid grid-cols-7 gap-4 p-4 border-b border-[#B4B4B4] bg-gray-200">
              <div className="text-center font-medium">STT</div>
              <div className="text-center font-medium">Mã bác sĩ</div>
              <div className="text-center font-medium">Tên bác sĩ</div>
              <div className="text-center font-medium">Chuyên ngành</div>
              <div className="text-center font-medium">Trạng thái</div>
              <div className="text-center font-medium">Phí</div>
              <div className="text-center font-medium">Hành động</div>
            </div>

            {/* Table Body - map over doctors */}
            {doctors.map((doctor, index) => (
              <div
                key={doctor._id}
                className="grid grid-cols-7 gap-4 p-4 border-b border-[#B4B4B4] items-center"
                style={{ height: "60px" }} // Set height to match grid
              >
                <div className="text-center">{index + 1}</div>
                <div className="text-center">{doctor._id}</div>
                <div className="text-center">{doctor.name}</div>
                <div className="text-center">{doctor.specialty}</div>
                <div className="text-center">
                  <p
                    className={`font-semibold ${
                      doctor.status === "Có sẵn" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {doctor.status}
                  </p>
                </div>
                <div className="text-center">{doctor.fee} VND</div>
                <div className="flex justify-center gap-2">
                  <Link to={`/admin/doctor/edit/${doctor._id}`}>
                    <ItemActionButton
                      className="item-action-button p-1 h-9 w-9"
                      img="/src/assets/Edit.svg"
                      variant="secondary"
                    />
                  </Link>
                  <ItemActionButton
                    className="item-action-button p-1 h-9 w-9"
                    onClick={() => handleDeleteDoctor(doctor._id)}
                    img="/src/assets/Trash.svg"
                    variant="danger"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorManagementPage;
