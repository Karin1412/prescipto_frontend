import React, { useEffect, useState } from "react";
import AppointmentCard from "../../components/layout/AppointmentCard";
import "../../styles/MyAppointmentsPage.css";
import appointmentsData from "../../data/appointmentsData";
import doctorsData from "../../data/doctorsData";
import patientsData from "../../data/patientsData";


const MyAppointmentsPage = () => {  
  // ID của bệnh nhân hiện tại
  const currentPatientId = "BN00001";

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const combinedAppointments = appointmentsData.map((appointment) => ({
          ...appointment,
          doctor: doctorsData.find((doc) => doc.id === appointment.doctorId),
          patient: patientsData.find((pat) => pat.id === appointment.patientId),
        }));

        // Lọc chỉ các appointments của bệnh nhân hiện tại
        const filteredAppointments = combinedAppointments.filter(
          (appointment) => appointment.patient?.id === currentPatientId
        );

        setAppointments(filteredAppointments);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="appointment-page">
      <div className="appointment-page-title">Danh sách lịch khám</div>
      <div className="appointment-list">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
        <AppointmentCard />
      </div>
    </div>
  );
};

export default MyAppointmentsPage;
