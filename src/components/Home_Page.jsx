import React from 'react'
import LargeRoundedCornerButton from './layout/LargeRoundedCornerButton';
import '../styles/LargeRoundedCornerButton.css';
import '../styles/Home_Page.css';
import { Link } from 'react-router-dom';

const Home_Page = () => {
  return (
    <div className='home-page'>
        <a href='/doctor-list'>
            <img src='/View doctor image.svg' className='image'></img>
        </a>

        <div className='search-by-specialty'>
                    <div className='home-page-title'>
                    Tìm theo chuyên ngành
                    </div>
                    <div className='section-description'>
                    Chỉ cần duyệt qua danh sách các bác sĩ đáng tin cậy của chúng tôi,<br/>lên lịch cuộc hẹn của bạn một cách dễ dàng.
                    </div>
                    <div className='specialty-list'>
                        <Link to="/doctors?specialty=general-physician" className='specialty'>
                            <img src='/General_physician.svg' className='specialty-image'/>
                            <span className='specialty-name'>Bác sĩ đa khoa</span>
                        </Link>
                        <Link to="/doctors?specialty=gynecologist" className='specialty'>
                            <img src='/Gynecologist.svg' className='specialty-image'/>
                            <span className='specialty-name'>Bác sĩ phụ khoa</span>
                        </Link>
                        <Link to="/doctors?specialty=" className='specialty'>
                            <img src='/Dermatologist.svg' className='specialty-image'/>
                            <span className='specialty-name'>Bác sĩ da liễu</span>
                        </Link>
                        <Link to="/doctors?specialty=pediatricians" className='specialty'>
                            <img src='/Pediatricians.svg' className='specialty-image'/>
                            <span className='specialty-name'>Bác sĩ nhi khoa</span>
                        </Link>
                        <Link to="/doctors?specialty=neurologist" className='specialty'>
                            <img src='/Neurologist.svg' className='specialty-image'/>
                            <span className='specialty-name'>Bác sĩ thần kinh</span>
                        </Link>
                        <Link to="/doctors?specialty=gastroenterologist" className='specialty'>
                            <img src='/Gastroenterologist.svg' className='specialty-image'/>
                            <span className='specialty-name'>Bác sĩ tiêu hóa</span>
                        </Link>
                    </div>
        </div>

        <div className='top-doctor'>
                    <div className='home-page-title'>Các bác sĩ hàng đầu</div>
                    <div className='section-description'>
                    Chỉ cần duyệt qua danh sách các bác sĩ đáng tin cậy của chúng tôi
                    </div>

                    <div className='top-doctor-list'>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialty-image'/>
                            <span className='specialty-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialty-image'/>
                            <span className='specialty-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialty-image'/>
                            <span className='specialty-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialty-image'/>
                            <span className='specialty-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialty-image'/>
                            <span className='specialty-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialty-image'/>
                            <span className='specialty-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialty-image'/>
                            <span className='specialty-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialty-image'/>
                            <span className='specialty-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialty-image'/>
                            <span className='specialty-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialty-image'/>
                            <span className='specialty-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialty-image'/>
                            <span className='specialty-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialty-image'/>
                            <span className='specialty-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialty-image'/>
                            <span className='specialty-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialty-image'/>
                            <span className='specialty-name'>Bác sĩ đa khoa</span>
                        </a>
                    </div>
                    <LargeRoundedCornerButton className='large-rounded-corner-button'
                    text='Xem thêm'
                    variant='secondary'/>
        </div>

        <a href='/register'>
            <img src='/Sign up image.svg' className='image'></img>
        </a>
    </div>
  )
}

export default Home_Page