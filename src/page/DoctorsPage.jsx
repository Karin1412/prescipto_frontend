import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DoctorsPage.css';
import '../styles/SelectionList.css';
import DoctorCard from '../components/layout/DoctorCard.jsx';
import doctorsData from '../data/doctorsData.jsx';

const specialties = [
  'Bác sĩ đa khoa',
  'Bác sĩ phụ khoa',
  'Bác sĩ da liễu',
  'Bác sĩ nhi khoa',
  'Bác sĩ thần kinh',
  'Bác sĩ tiêu hóa',
];

const DoctorsPage = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const navigate = useNavigate();

  const filteredDoctors = selectedSpecialty
    ? doctorsData.filter((doctor) => doctor.specialty === selectedSpecialty)
    : doctorsData;
  
    const handleDoctorSelect = (doctor) => {
      navigate(`/appointment/${doctor.id}`, { state: { doctor } });
    }

  return (
    <div className="doctors-page">
      <div className="layout">
        {/* Danh sách chọn chuyên khoa */}
        <div className="specialty-list">
          <button
            className={`specialty-button ${selectedSpecialty === null ? 'active' : ''}`}
            onClick={() => setSelectedSpecialty(null)}
          >
            Tất cả bác sĩ
          </button>
          {specialties.map((specialty) => (
            <button
              key={specialty}
              className={`specialty-button ${
                selectedSpecialty === specialty ? 'active' : ''
              }`}
              onClick={() => setSelectedSpecialty(specialty)}
            >
              {specialty}
            </button>
          ))}
        </div>

        {/* Hiển thị danh sách bác sĩ */}
        <div className="doctors-grid">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} 
            onClick={() => handleDoctorSelect(doctor)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;
