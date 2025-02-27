import React from 'react';
import '../../styles/DoctorCard.css';

const DoctorCard = ({ doctor, onClick }) => {
  return (
    <div className="doctor-card" onClick={onClick}>
      <img
        src={doctor.image || "/Placeholder.png"}
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
  );
};

export default DoctorCard;
