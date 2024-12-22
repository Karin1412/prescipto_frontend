import React, { useEffect, useState } from 'react';
import LargeRoundedCornerButton from '../../components/layout/LargeRoundedCornerButton';
import '../../styles/LargeRoundedCornerButton.css';
import '../../styles/HomePage.css';
import '../../styles/DoctorCard.css';
import { Link } from 'react-router-dom';
import DoctorCard from '../../components/layout/DoctorCard';
  
  const fakeApi = async (url) => {
    const data = {
      /*
      "/specialties": [
        {
          id: 1,
          specialtyName: "Bác sĩ đa khoa",
          specialtyImage: "/General_physician.svg",
        },
        {
          id: 2,
          specialtyName: "Bác sĩ phụ khoa",
          specialtyImage: "/Gynecologist.svg",
        },
        {
          id: 3,
          specialtyName: 'Bác sĩ da liễu',
          specialtyImage: "/Dermatologist.svg",
        },
        {
          id: 4,
          specialtyName: 'Bác sĩ nhi khoa',
          specialtyImage: "/Pediatricians.svg",
        },
        {
          id: 5,
          specialtyName:  'Bác sĩ thần kinh',
          specialtyImage: "/Neurologist.svg",
        },
        {
          id: 6,
          specialtyName:  'Bác sĩ tiêu hóa',
          specialtyImage: "/Gastroenterologist.svg",
        }
      ],
      */

      "/doctors": [
        {
          id: 1,
          name: "Dr. Richard James",
          specialty: "Bác sĩ đa khoa",
          status: 'Có sẵn',
          profileImage: "https://via.placeholder.com/160x182"
        },
        {
          id: 2,
          name: "Dr. Richard James",
          specialty: "Bác sĩ đa khoa",
          status: 'Có sẵn',
          profileImage: "https://via.placeholder.com/160x182"
        }
        ,
        {
          id: 3,
          name: "Dr. Richard James",
          specialty: "Bác sĩ đa khoa",
          status: 'Có sẵn',
          profileImage: "https://via.placeholder.com/160x182"
        }
        ,
        {
          id: 4,
          name: "Dr. Richard James",
          specialty: "Bác sĩ đa khoa",
          status: 'Có sẵn',
          profileImage: "https://via.placeholder.com/160x182"
        }
        ,
        {
          id: 5,
          name: "Dr. Richard James",
          specialty: "Bác sĩ đa khoa",
          status: 'Có sẵn',
          profileImage: "https://via.placeholder.com/160x182"
        }
        ,
        {
          id: 6,
          name: "Dr. Richard James",
          specialty: "Bác sĩ đa khoa",
          status: 'Có sẵn',
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

  
const HomePage = () => {

  const [doctors, setDoctors] = useState([]);
  /*
  const [specialties, setSpecialties] = useState([]);
  */

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const specialtiesData = await fakeApi("/specialties");
        const doctorsData = await fakeApi("/doctors");
  
        //console.log("Chuyên ngành:", specialtiesData);
        console.log("Danh sách bác sĩ:", doctorsData);
  
        //setSpecialties(specialtiesData);
        setDoctors(doctorsData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };
  
    fetchData();
  }, []);



  return (
    <div className='home-page'>
        <a href='/doctor-list'>
            <img src='/src/assets/View doctor image.svg' className='image'></img>
        </a>

        <div className='search-by-specialty'>
                    <div className='title'>
                    Tìm theo chuyên ngành
                    </div>
                    <div className='section-description'>
                    Chỉ cần duyệt qua danh sách các bác sĩ đáng tin cậy của chúng tôi,<br/>lên lịch cuộc hẹn của bạn một cách dễ dàng.
                    </div>
                    <div className='specialty-list'>
                        <Link to="/all-doctors?specialty=general-physician" className='specialty'>
                            <img src='/src/assets/General_physician.svg' className='specialty-image'/>
                            <span className='specialty-name'>Bác sĩ đa khoa</span>
                        </Link>
                        <Link to="/all-doctors?specialty=gynecologist" className='specialty'>
                            <img src='/src/assets/Gynecologist.svg' className='specialty-image'/>
                            <span className='specialty-name'>Bác sĩ phụ khoa</span>
                        </Link>
                        <Link to="/all-doctors?specialty=dermatologist" className='specialty'>
                            <img src='/src/assets/Dermatologist.svg' className='specialty-image'/>
                            <span className='specialty-name'>Bác sĩ da liễu</span>
                        </Link>
                        <Link to="/all-doctors?specialty=pediatricians" className='specialty'>
                            <img src='/src/assets/Pediatricians.svg' className='specialty-image'/>
                            <span className='specialty-name'>Bác sĩ nhi khoa</span>
                        </Link>
                        <Link to="/all-doctors?specialty=neurologist" className='specialty'>
                            <img src='/src/assets/Neurologist.svg' className='specialty-image'/>
                            <span className='specialty-name'>Bác sĩ thần kinh</span>
                        </Link>
                        <Link to="/all-doctors?specialty=gastroenterologist" className='specialty'>
                            <img src='/src/assets/Gastroenterologist.svg' className='specialty-image'/>
                            <span className='specialty-name'>Bác sĩ tiêu hóa</span>
                        </Link>
                    </div>
        </div>

        <div className='top-doctor'>
            <div className='title'>Các bác sĩ hàng đầu</div>
            <div className='section-description'>
              Chỉ cần duyệt qua danh sách các bác sĩ đáng tin cậy của chúng tôi
            </div>

            <div className="top-doctors-list">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>

            <Link to="/all-doctors">
              <LargeRoundedCornerButton className='large-rounded-corner-button'
                text='Xem thêm'
                variant='secondary'/>
              </Link>
        </div>

        <a href='/register'>
            <img src='/src/assets/Sign up image.svg' className='image'></img>
        </a>
    </div>
  )
}

export default HomePage