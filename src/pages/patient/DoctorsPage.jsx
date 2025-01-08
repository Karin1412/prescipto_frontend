import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/DoctorsPage.css';
import '../../styles/SelectionList.css';
import DoctorCard from '../../components/layout/DoctorCard.jsx';
import doctorsData from '../../data/doctorsData.jsx';

const specialties = [
  { label: 'Tất cả bác sĩ', value: null },
  { label: 'Bác sĩ đa khoa', value: 'Bác sĩ đa khoa' },
  { label: 'Bác sĩ phụ khoa', value: 'Bác sĩ phụ khoa' },
  { label: 'Bác sĩ da liễu', value: 'Bác sĩ da liễu' },
  { label: 'Bác sĩ nhi khoa', value: 'Bác sĩ nhi khoa' },
  { label: 'Bác sĩ thần kinh', value: 'Bác sĩ thần kinh' },
  { label: 'Bác sĩ tiêu hóa', value: 'Bác sĩ tiêu hóa' },
];

const DoctorsPage = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (location.state?.specialty) {
      setSelected(location.state.specialty);
    }
  }, [location.state]);

  console.log(selected); 
  
  const filteredDoctors = selected
    ? doctorsData.filter((doctor) => doctor.specialty === selected)
    : doctorsData;

  const handleDoctorSelect = (doctor) => {
    navigate(`/appointment/${doctor.id}`, { state: { doctor } });
  };

  return (
    <div className="doctors-page">
      <div className="layout">
        {/* Danh sách chọn chuyên khoa */}
        <div className="selection-list">
          {specialties.map((specialty) => (
            <button
              key={specialty.value}
              className={`selection-button ${
                selected === specialty.value ? 'active' : ''
              }`}
              onClick={() => setSelected(specialty.value)}
            >
              {specialty.label}
            </button>
          ))}
        </div>

        {/* Hiển thị danh sách bác sĩ */}
        <div className="doctors-grid">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onClick={() => handleDoctorSelect(doctor)}
              />
            ))
          ) : (
            <p className="no-doctors-message">Không có bác sĩ nào phù hợp.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;
