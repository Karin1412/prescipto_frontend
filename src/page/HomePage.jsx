import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LargeRoundedCornerButton from '../components/layout/LargeRoundedCornerButton.jsx';
import DoctorCard from '../components/layout/DoctorCard.jsx';
import doctorsData from '../data/doctorsData.jsx';
import '../styles/LargeRoundedCornerButton.css';
import '../styles/HomePage.css';

const Home_Page = () => {
  const navigate = useNavigate();
  const topDoctors = doctorsData.slice(0, 10); // Hiển thị tối đa 10 bác sĩ

  const handleSpecialtyClick = (specialty) => {
    navigate('/all-doctors', { state: { specialty } });
  };

  return (
    <div className="home-page">
      <a href="/all-doctors">
        <img src="/View doctor image.svg" className="image" alt="View Doctor" />
      </a>

      <div className="search-by-specialty">
        <div className="home-page-title">Tìm theo chuyên ngành</div>
        <div className="section-description">
          Chỉ cần duyệt qua danh sách các bác sĩ đáng tin cậy của chúng tôi,<br />
          lên lịch cuộc hẹn của bạn một cách dễ dàng.
        </div>
        <div className="specialty-list">
          <div className="specialty" onClick={() => handleSpecialtyClick('general-physician')}>
            <img src="/General_physician.svg" className="specialty-image" alt="General Physician" />
            <span className="specialty-name">Bác sĩ đa khoa</span>
          </div>
          <div className="specialty" onClick={() => handleSpecialtyClick('gynecologist')}>
            <img src="/Gynecologist.svg" className="specialty-image" alt="Gynecologist" />
            <span className="specialty-name">Bác sĩ phụ khoa</span>
          </div>
          <div className="specialty" onClick={() => handleSpecialtyClick('dermatologist')}>
            <img src='/Dermatologist.svg' className='specialty-image' alt="Dermatologist"/>
            <span className='specialty-name'>Bác sĩ da liễu</span>
          </div>
          <div className="specialty" onClick={() => handleSpecialtyClick('pediatrician')}>
            <img src='/Pediatricians.svg' className='specialty-image' alt="Pediatrician"/>
            <span className='specialty-name'>Bác sĩ nhi khoa</span>
          </div>
          <div className="specialty" onClick={() => handleSpecialtyClick('neurologist')}>
            <img src='Neurologist.svg' className='specialty-image' alt="Neurologist"/>
            <span className='specialty-name'>Bác sĩ thần kinh</span>
          </div>
          <div className="specialty" onClick={() => handleSpecialtyClick('gastroenterologist')}>
            <img src='/Gastroenterologist.svg' className='specialty-image' alt="Gastroenterologist"/>
            <span className='specialty-name'>Bác sĩ tiêu hóa</span>
          </div>
        </div>
      </div>

      <div className="top-doctor">
        <div className="home-page-title">Các bác sĩ hàng đầu</div>
        <div className="section-description">
          Chỉ cần duyệt qua danh sách các bác sĩ đáng tin cậy của chúng tôi
        </div>
        <div className="top-doctor-list">
          {topDoctors.map((doc) => (
            <DoctorCard
              key={doc.id}
              doctor={doc}
              onClick={() => navigate(`/appointment/${doc.id}`, { state: { doctor: doc } })}
            />
          ))}
        </div>
        <LargeRoundedCornerButton
          className="large-rounded-corner-button"
          text="Xem thêm"
          variant="secondary"
          onClick={() => navigate('/all-doctors')}
        />
      </div>

      <a href="/register">
        <img src="/Sign up image.svg" className="image" alt="Sign Up" />
      </a>
    </div>
  );
};

export default Home_Page;
