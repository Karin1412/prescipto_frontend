import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/AppointmentPage.css';
import DoctorCard from '../../components/layout/DoctorCard.jsx';


const AppointmentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctorId } = location.state || {}; // Lấy ID bác sĩ từ state

  const [doctor, setDoctor] = useState(null);
  const [similarDoctors, setSimilarDoctors] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
  if (doctorId) {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/doctors/${doctorId}`);
        if (response.ok) {
          const data = await response.json();
          setDoctor(data);
        } else {
          console.error('Không tìm thấy bác sĩ');
        }
      } catch (error) {
        console.error('Lỗi khi fetch thông tin bác sĩ:', error);
      }
    };

    const fetchOtherDoctors = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/doctors`);
        if (response.ok) {
          const data = await response.json();
          const filteredDoctors = data.filter((doc) => doc._id !== doctorId).slice(0, 5);
          setSimilarDoctors(filteredDoctors); 
        } else {
          console.error('Không tìm thấy bác sĩ');
        }
      } catch (error) {
        console.error('Lỗi khi fetch bác sĩ khác:', error);
      }
    };

    fetchDoctor();
    fetchOtherDoctors();
  }
}, [doctorId, doctor]); 

  const daysOfWeek = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  // Tính toán danh sách ngày tháng thực
  const calculateDays = () => {
    const today = new Date();
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i); // Tăng ngày theo chỉ số
      const dayOfWeek = daysOfWeek[date.getDay() === 0 ? 6 : date.getDay() - 1]; // Xử lý cho CN
      const day = date.getDate();
      const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
      days.push({ dayOfWeek, day, month });
    }
    return days;
  };

  const days = calculateDays();
  const timeSlots = ['8.00 am', '8.30 am', '9.00 am', '9.30 am', '10.00 am', '10.30 am', '11.00 am', '11.30 am'];

  const handleBookAppointment = async () => {
    const token = localStorage.getItem('token'); 
    const user = JSON.parse(localStorage.getItem('user')) || {}; 
    const patientId = user.id || ''; 

      if (!patientId) {
        alert('Không tìm thấy thông tin người dùng');
        return;
      }

    if (!token) {
      alert('Bạn cần đăng nhập để đặt lịch hẹn!');
      navigate('/login');
      return;
    }

  if (selectedTime) {
    const appointmentData = {
      patientId: patientId, 
      doctorId: doctor._id,
      appointmentTime: `${days[selectedDay].dayOfWeek}, ngày ${days[selectedDay].day}/${days[selectedDay].month} lúc ${selectedTime}`,
    };

    try {
      const response = await fetch('http://localhost:5000/api/appointments/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Đặt lịch hẹn thành công với bác sĩ ${doctor.name}!\nTrạng thái: ${data.appointment.status}`);
        navigate('/');
      } else {
        const errorData = await response.json();
        alert(`Lỗi: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      alert('Lỗi kết nối! Vui lòng thử lại.');
    }
  } else {
    alert('Vui lòng chọn thời gian đặt lịch!');
  }
};

  return (
    <div className="appointment-page">
      {doctor ? (
        <div className="appointment-content">
          {/* Chi tiết bác sĩ */}
          <div className="doctor-section">
            <img src={doctor.image || "/Placeholder.png"} className="image" />
            <div className="doctor-detailinfo">
              <h2>{doctor.name}</h2>
              <div className="doctor-details-row">
                <p className="specialty">{doctor.specialty}</p>
                <p className="experience">{doctor.experience}</p>
              </div>
              <p className="description">{doctor.description}</p>
              <p className="fee">Phí đặt lịch: {doctor.fee}</p>
            </div>
          </div>

          {/* Thời gian đặt lịch */}
          <div className="appointment-time">
            <h3>Thời gian đặt lịch</h3>
            <div className="day-selector">
              {days.map((day, index) => (
                <button
                  key={index}
                  className={`day-button ${index === selectedDay ? 'active' : ''}`}
                  onClick={() => setSelectedDay(index)}
                >
                  {day.dayOfWeek} <span>{day.day} th{day.month}</span>
                </button>
              ))}
            </div>
            <div className="time-slots">
              {timeSlots.map((time, index) => (
                <button
                  key={index}
                  className={`time-button ${time === selectedTime ? 'active' : ''}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
            <button className="book-button" onClick={handleBookAppointment}>
              Đặt lịch
            </button>
          </div>

          {/* Danh sách bác sĩ tương tự */}
          <div className="similar-doctors">
            <h2>Các bác sĩ khác</h2>
            <div className="doctors-grid">
              {similarDoctors.map((doc) => (
                <DoctorCard
                  key={doc._id} // Sử dụng _id từ MongoDB nếu bạn sử dụng MongoDB
                  doctor={doc}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/appointment/${doc._id}`, { state: { doctorId: doc._id } });
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        doctorId
      
      )}
    </div>
  );
};

export default AppointmentPage;
