import React from 'react'
import LargeRoundedCornerButton from './layout/LargeRoundedCornerButton';
import '../styles/LargeRoundedCornerButton.css';
import '../styles/Home_Page.css';

const Home_Page = () => {
  return (
    <div className='home-page'>
                <a href='/doctor-list'>
                    <img src='/View doctor image.svg' className='image'></img>
                </a>

                <div className='search-by-specialization'>
                    <div className='title'>
                    Tìm theo chuyên ngành
                    </div>
                    <div className='section-description'>
                    Chỉ cần duyệt qua danh sách các bác sĩ đáng tin cậy của chúng tôi,<br/>lên lịch cuộc hẹn của bạn một cách dễ dàng.
                    </div>
                    <div className='specialization-list'>
                        <a href='/general-physician' className='specialization'>
                            <img src='/General_physician.svg' className='specialization-image'/>
                            <span className='specialization-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/gynecologist' className='specialization'>
                            <img src='/Gynecologist.svg' className='specialization-image'/>
                            <span className='specialization-name'>Bác sĩ phụ khoa</span>
                        </a>
                        <a href='/dermatologist' className='specialization'>
                            <img src='/Dermatologist.svg' className='specialization-image'/>
                            <span className='specialization-name'>Bác sĩ da liễu</span>
                        </a>
                        <a href='pediatricians' className='specialization'>
                            <img src='/Pediatricians.svg' className='specialization-image'/>
                            <span className='specialization-name'>Bác sĩ nhi khoa</span>
                        </a>
                        <a href='neurologist' className='specialization'>
                            <img src='/Neurologist.svg' className='specialization-image'/>
                            <span className='specialization-name'>Bác sĩ thần kinh</span>
                        </a>
                        <a href='gastroenterologist' className='specialization'>
                            <img src='/Gastroenterologist.svg' className='specialization-image'/>
                            <span className='specialization-name'>Bác sĩ tiêu hóa</span>
                        </a>
                    </div>
                </div>

                <div className='search-by-specialization'>
                    <div className='title'>
                    Các bác sĩ hàng đầu
                    </div>
                    <div className='section-description'>
                    Chỉ cần duyệt qua danh sách các bác sĩ đáng tin cậy của chúng tôi

                    <div className='top-doctor-list'>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialization-image'/>
                            <span className='specialization-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialization-image'/>
                            <span className='specialization-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialization-image'/>
                            <span className='specialization-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialization-image'/>
                            <span className='specialization-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialization-image'/>
                            <span className='specialization-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialization-image'/>
                            <span className='specialization-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialization-image'/>
                            <span className='specialization-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialization-image'/>
                            <span className='specialization-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialization-image'/>
                            <span className='specialization-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialization-image'/>
                            <span className='specialization-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialization-image'/>
                            <span className='specialization-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialization-image'/>
                            <span className='specialization-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialization-image'/>
                            <span className='specialization-name'>Bác sĩ đa khoa</span>
                        </a>
                        <a href='/general-physician' className='doctor-card'>
                            <img src='/General_physician.svg' className='specialization-image'/>
                            <span className='specialization-name'>Bác sĩ đa khoa</span>
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
         </div>
  )
}

export default Home_Page