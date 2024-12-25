import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import appointmentsData from "../../data/appointmentsData";
import doctorsData from "../../data/doctorsData";
import patientsData from "../../data/patientsData";
import ItemActionButton from "../../components/layout/ItemActionButton";
import "../../styles/ItemActionButton.css";
import "../../styles/Popup.css";

// Đăng ký module ClientSideRowModelModule
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const AppointmentList = () => {
  const [combinedAppointments, setCombinedAppointments] = useState([]);
  const [quickFilterText, setQuickFilterText] = useState("");
  const [showApprovePopup, setShowApprovePopup] = useState(false); // State for approve popup visibility
  const [showRejectopup, setShowRejectPopup] = useState(false); // State for reject popup visibility
  const [appointmentToApprove, setAppointmentToApprove] = useState(null); // Store the appointment to approve
  const [appointmentToReject, setAppointmentToReject] = useState(null); // Store the appointment to reject

  useEffect(() => {
    const combineData = () => {
      const combined = appointmentsData.map((appointment) => ({
        ...appointment,
        doctor: doctorsData.find((doc) => doc.id === appointment.doctorId),
        patient: patientsData.find((pat) => pat.id === appointment.patientId),
      }));
      setCombinedAppointments(combined);
    };

    combineData();
  }, []);

  // Handle the approval of an appointment
  const approveAppointmentHandle = (id) => {
    setAppointmentToApprove(id); // Set the appointment ID for approval
    setShowApprovePopup(true); // Show the popup
  };

  const handleApprovalConfirmation = () => {
    const updatedAppointments = combinedAppointments.map((appointment) => {
      if (appointment.id === appointmentToApprove) {
        return { ...appointment, status: "Đã duyệt", actionsDisabled: true };
      }
      return appointment;
    });
    setCombinedAppointments(updatedAppointments); // Update the state
    console.log("Lịch khám đã được duyệt");
    toast.success("Lịch khám đã được duyệt");

    // Close the popup and reset
    setShowApprovePopup(false);
    setAppointmentToApprove(null);
  };

  const handleApprovalCancel = () => {
    setShowApprovePopup(false);
    setAppointmentToApprove(null);
    console.log("Duyệt lịch khám đã bị hủy");
  };


  // Handle the rejection of an appointment
  const rejectAppointmentHandle = (id) => {
    setAppointmentToReject(id); // Set the appointment ID for rejection
    setShowRejectPopup(true); // Show the popup
  };

  const handleRejectionConfirmation = () => {
    const updatedAppointments = combinedAppointments.map((appointment) => {
      if (appointment.id === appointmentToReject) {
        return { ...appointment, status: "Bị từ chối", actionsDisabled: true };
      }
      return appointment;
    });
    setCombinedAppointments(updatedAppointments); // Update the state
    toast.success("Lịch khám đã bị từ chối");

    // Close the popup and reset
    setShowRejectPopup(false);
    setAppointmentToReject(null);
  };

  const handleRejectionCancel = () => {
    setShowRejectPopup(false);
    setAppointmentToReject(null);
    console.log("Từ chối lịch khám đã bị hủy");
  };
  
  const columnDefs = [
    {
      headerName: "Mã lịch khám",
      field: "id",
      sortable: true,
      filter: true,
      resizable: true,
      width: 120,
    },
    {
      headerName: "Tên bệnh nhân",
      field: "patientName",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: "Tên bác sĩ",
      field: "doctorName",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: "Thời gian khám",
      field: "appointmentTime",
      sortable: true,
      filter: true,
      resizable: true,
      valueFormatter: (params) =>
        new Date(params.value).toLocaleString("vi-VN"),
      width: 160,
    },
    {
      headerName: "Trạng thái",
      field: "status",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "grid-cell-centered",
      width: 110,
      cellStyle: (params) => {
        // Change color based on status value
        switch (params.value) {
          case "Được duyệt":
            color = "#A49703";
            break;
          case "Chờ duyệt":
            color = "#A49703";
            break;
          case "Đã hủy":
            color = "#4B5563";
            break;
          case "Bị từ chối":
            color = "#FF6767";
            break;
          case "Đã khám":
            color = "#5F6FFF";
            console.log("#5F6FFF");
            break;
          default:
            color = "black";
        }
        return { color };
      },
    },
    {
      headerName: "Hành động",
      field: "actions",
      cellRenderer: (params) => (
        <div className="flex">
          <ItemActionButton
            img="/src/assets/Check Square Contained.svg"
            variant="primary"
            className="item-action-button h-6 w-6 m-2 p-1"
            onClick={() => approveAppointmentHandle(params.data.id)}
            disabled={params.data.actionsDisabled}
          />
          <ItemActionButton
            img="/src/assets/X red.svg"
            variant="danger"
            className="item-action-button h-6 w-6 m-2 p-1"
            onClick={() => rejectAppointmentHandle(params.data.id)}
            disabled={params.data.actionsDisabled}
          />
        </div>
      ),
      resizable: true,
    },
  ];

  const rowData = combinedAppointments.map((appointment) => ({
    id: appointment.id,
    patientName: appointment.patient ? appointment.patient.name : "N/A",
    doctorName: appointment.doctor ? appointment.doctor.name : "N/A",
    appointmentTime: appointment.appointmentTime,
    status: appointment.status,
    actionsDisabled: appointment.status === "Chờ duyệt" ? false : true,
  }));

  return (
    <div className="container">
      <div className="flex justify-between mb-4 items-center">
        <h1 className="size-6 w-auto uppercase text-[#2A2A2A]">
          {combinedAppointments.length} Lịch khám
        </h1>
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
          <p>Không có lịch khám nào để hiển thị.</p>
        )}
      </div>
      {/* Approve Appointment Popup */}
      {showApprovePopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-header">
              <h2>Xác nhận duyệt lịch khám</h2>
              <button className="close-button" onClick={handleApprovalCancel}>
                <img src="/src/assets/X black.svg" alt="Close" />
              </button>
            </div>
            <p>Bạn có chắc chắn muốn duyệt lịch khám này?</p>
            <div className="button-group">
              <button className="no-button" onClick={handleApprovalCancel}>
                Không
              </button>
              <button
                className="yes-button"
                onClick={handleApprovalConfirmation}
              >
                Có
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Reject Appointment Popup */}
      {showRejectopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-header">
              <h2>Xác nhận từ chối lịch khám</h2>
              <button className="close-button" onClick={handleRejectionCancel}>
                <img src="/src/assets/X black.svg" alt="Close" />
              </button>
            </div>
            <p>Bạn có chắc chắn muốn từ chối lịch khám này?</p>
            <div className="button-group">
              <button className="no-button" onClick={handleRejectionCancel}>
                Không
              </button>
              <button
                className="yes-button"
                onClick={handleRejectionConfirmation}
              >
                Có
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
