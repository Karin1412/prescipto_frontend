import React, { useState } from 'react';
import './styles/DoctorsPage.css';
import './styles/SelectionList.css';

const doctorsData = [
  { id: 1, name: 'Dr. Richard James', specialty: 'Bác sĩ đa khoa', status: 'Có sẵn' },
  { id: 2, name: 'Dr. Richard James', specialty: 'Bác sĩ phụ khoa', status: 'Có sẵn' },
  { id: 3, name: 'Dr. Richard James', specialty: 'Bác sĩ da liễu', status: 'Có sẵn' },
  { id: 4, name: 'Dr. Richard James', specialty: 'Bác sĩ nhi khoa', status: 'Có sẵn' },
  { id: 5, name: 'Dr. Richard James', specialty: 'Bác sĩ thần kinh', status: 'Có sẵn' },
  { id: 6, name: 'Dr. Richard James', specialty: 'Bác sĩ tiêu hóa', status: 'Bận' },
  { id: 7, name: 'Dr. Richard James', specialty: 'Bác sĩ đa khoa', status: 'Có sẵn' },
  { id: 8, name: 'Dr. Richard James', specialty: 'Bác sĩ đa khoa', status: 'Có sẵn' },
  { id: 9, name: 'Dr. Richard James', specialty: 'Bác sĩ đa khoa', status: 'Có sẵn' },
  { id: 10, name: 'Dr. Richard James', specialty: 'Bác sĩ đa khoa', status: 'Có sẵn' },
  { id: 11, name: 'Dr. Richard James', specialty: 'Bác sĩ đa khoa', status: 'Có sẵn' },
  { id: 12, name: 'Dr. Richard James', specialty: 'Bác sĩ đa khoa', status: 'Có sẵn' },
  { id: 13, name: 'Dr. Richard James', specialty: 'Bác sĩ đa khoa', status: 'Có sẵn' },
  { id: 14, name: 'Dr. Richard James', specialty: 'Bác sĩ đa khoa', status: 'Có sẵn' },
];

const specialties = [
  'Bác sĩ đa khoa',
  'Bác sĩ phụ khoa',
  'Bác sĩ da liễu',
  'Bác sĩ nhi khoa',
  'Bác sĩ thần kinh',
  'Bác sĩ tiêu hóa',
];

const DoctorsPage = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('Bác sĩ đa khoa');

  const filteredDoctors = doctorsData.filter(
    (doctor) => doctor.specialty === selectedSpecialty
  );

  return (
    <div className="doctors-page">
      <div className="layout">
        {/* Danh sách chọn chuyên khoa */}
        <div className="specialty-list">
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
            <div className="doctor-card" key={doctor.id}>
              <img
                src="https://via.placeholder.com/100"
                alt={doctor.name}
                className="doctor-image"
              />
              <div className="doctor-info">
                <span
                  className={`status ${
                    doctor.status === 'Có sẵn' ? 'available' : 'busy'
                  }`}
                >
                  <span className="dot">•</span>{doctor.status}
                </span>
                <h3>{doctor.name}</h3>
                <p>{doctor.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;
