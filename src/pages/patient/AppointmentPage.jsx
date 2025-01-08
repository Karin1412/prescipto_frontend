import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/AppointmentPage.css';
import DoctorCard from '../../components/layout/DoctorCard.jsx';
import doctorsData from '../../data/doctorsData.jsx';

const AppointmentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctor } = location.state || {};

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);

  // Ngày trong tuần
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

  const handleBookAppointment = () => {
    if (selectedTime) {
      alert(`Đã đặt lịch hẹn với ${doctor.name} vào ${days[selectedDay].dayOfWeek}, ngày ${days[selectedDay].day}/${days[selectedDay].month} lúc ${selectedTime}`);
      navigate('/');
    } else {
      alert('Vui lòng chọn thời gian đặt lịch!');
    }
  };
  

  const similarDoctors = doctorsData.filter(
    (d) => d.specialty === doctor?.specialty && d.id !== doctor?.id
  );

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
            <h2>Các bác sĩ tương tự</h2>
            <div className="doctors-grid">
              {similarDoctors.map((doc) => (
                <DoctorCard
                  key={doc.id}
                  doctor={doc}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/appointment/${doc.id}`, { state: { doctor: doc } })}
                  }
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Không tìm thấy thông tin bác sĩ.</p>
      )}
    </div>
  );
};

export default AppointmentPage;
