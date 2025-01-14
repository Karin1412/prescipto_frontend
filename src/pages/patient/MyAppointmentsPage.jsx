import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppointmentCard from '../../components/layout/AppointmentCard';

const MyAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')) || {}; 
  const patientId = user.id || '';

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/appointments/me/${patientId}`);
        setAppointments(response.data); // Lưu lịch hẹn vào state
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    if (patientId) {
      fetchAppointments();  // Gọi API nếu patientId tồn tại
    }
  }, [patientId]);

  return (
    <div className="appointment-page">
      <div className="appointment-page-title">Danh sách lịch khám</div>
      <div className="appointment-list">
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
          />
        ))}
      </div>
    </div>
  );
};

export default MyAppointmentsPage;
