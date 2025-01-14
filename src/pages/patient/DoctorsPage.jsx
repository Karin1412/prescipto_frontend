import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/DoctorsPage.css';
import '../../styles/SelectionList.css';
import DoctorCard from '../../components/layout/DoctorCard.jsx';

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
  const [doctors, setDoctors] = useState([]); // State để lưu danh sách bác sĩ
  const [similarDoctors, setSimilarDoctors] = useState([]); // Thêm state để lưu bác sĩ tương tự
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Bác sĩ được chọn
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (location.state?.specialty) {
      setSelected(location.state.specialty);
    }
  }, [location.state]);

  // Fetch data bác sĩ từ API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        let url = 'http://localhost:5000/api/doctors'; // Địa chỉ API của bạn
        if (selected) {
          url += `?specialty=${selected}`; // Thêm query parameter nếu có chuyên khoa đã chọn
        }
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setDoctors(data); // Cập nhật danh sách bác sĩ
        } else {
          console.error('Failed to fetch doctors');
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, [selected]); // Gọi lại khi chuyên khoa thay đổi

  // Fetch các bác sĩ tương tự nếu đã chọn bác sĩ
  useEffect(() => {
    if (selectedDoctor) {
      const fetchSimilarDoctors = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/similar-doctors?specialty=${selectedDoctor.specialty}&doctorId=${selectedDoctor._id}`);
          if (response.ok) {
            const data = await response.json();
            setSimilarDoctors(data);
          } else {
            console.error('Failed to fetch similar doctors');
          }
        } catch (error) {
          console.error('Error fetching similar doctors:', error);
        }
      };

      fetchSimilarDoctors();
    }
  }, [selectedDoctor]);

  const handleDoctorSelect = (doctor) => {
    if (doctor._id) {
      setSelectedDoctor(doctor); // Cập nhật bác sĩ đã chọn
      navigate(`/appointment/${doctor._id}`, { state: { doctorId: doctor._id } });
    } else {
      console.error("Doctor ID is missing!");
    }
  };

  return (
    <div className="doctors-page">
      <div className="layout">
        {/* Danh sách chọn chuyên khoa */}
        <div className="selection-list">
          {specialties.map((specialty) => (
            <button
              key={specialty.value}
              className={`selection-button ${selected === specialty.value ? 'active' : ''}`}
              onClick={() => setSelected(specialty.value)}
            >
              {specialty.label}
            </button>
          ))}
        </div>

        {/* Hiển thị danh sách bác sĩ */}
        <div className="doctors-grid">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <DoctorCard
                key={doctor._id} // Sử dụng _id từ MongoDB nếu bạn sử dụng MongoDB
                doctor={doctor}
                onClick={() => handleDoctorSelect(doctor)}
              />
            ))
          ) : (
            <p className="no-doctors-message">Không có bác sĩ nào phù hợp.</p>
          )}
        </div>

        {/* Hiển thị các bác sĩ tương tự */}
        {selectedDoctor && similarDoctors.length > 0 && (
          <div className="similar-doctors-section">
            <h2>Các bác sĩ tương tự</h2>
            <div className="doctors-grid">
              {similarDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor._id} // Sử dụng _id từ MongoDB nếu bạn sử dụng MongoDB
                  doctor={doctor}
                  onClick={() => handleDoctorSelect(doctor)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;
