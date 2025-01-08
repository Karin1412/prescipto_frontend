import React, { useEffect, useState } from 'react';
import AppointmentCard from '../../components/layout/AppointmentCard';
import '../../styles/MyAppointmentsPage.css';

const fakeApi = async (url) => {
  const data = {
    "/appointments": [
      {
        id: 1,
        doctorId: 1,
        appointmentTime: "2024-12-20T09:00:00",
        status: "Chờ duyệt"
      },
      {
        id: 2,
        doctorId: 2,
        appointmentTime: "2024-12-20T10:30:00",
        status: "Đã khám"
      },
      {
        id: 1,
        doctorId: 1,
        appointmentTime: "2024-12-20T09:00:00",
        status: "Bị từ chối"
      },
      {
        id: 2,
        doctorId: 2,
        appointmentTime: "2024-12-20T10:30:00",
        status: "Được duyệt"
      },
      {
        id: 2,
        doctorId: 2,
        appointmentTime: "2024-12-20T10:30:00",
        status: "Đã hủy"
      }
    ],
    "/doctors": [
      {
        id: 1,
        name: "Dr. Richard James",
        specialty: "Bác sĩ đa khoa",
        profileImage: "https://via.placeholder.com/160x182"
      },
      {
        id: 2,
        name: "Dr. Richard James",
        specialty: "Bác sĩ đa khoa",
        profileImage: "https://via.placeholder.com/160x182"
      }
    ]
  };

  console.log("URL gọi fakeApi:", url); // In URL mỗi lần được gọi
  console.log("Dữ liệu trả về:", data[url]); // Kiểm tra kết quả

  return new Promise((resolve) => {
    setTimeout(() => resolve(data[url]), 1000); // Giả lập độ trễ 1 giây
  });
};


const MyAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointmentsData = await fakeApi("/appointments");
        const doctorsData = await fakeApi("/doctors");
  
        console.log("Lịch hẹn:", appointmentsData);
        console.log("Danh sách bác sĩ:", doctorsData);
  
        const combinedAppointments = appointmentsData.map((appointment) => ({
          ...appointment,
          doctor: doctorsData.find((doc) => doc.id === appointment.doctorId),
        }));
  
        console.log("Kết quả kết hợp:", combinedAppointments);
  
        setAppointments(combinedAppointments);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className='appointment-page'>
        <div className='appointment-page-title'>Danh sách lịch khám</div>
        <div className="appointment-list">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
            />
        ))}
        <AppointmentCard/>
      </div>
    </div>
  );
};

export default MyAppointmentsPage
