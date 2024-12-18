import React from 'react';
import '../../styles/AppointmentCard.css';
import WhiteWithBlackBorderBtn from './WhiteWithBlackBorderBtn';
import "../../styles/WhiteWithBlackBorderBtn.css"

const Appointment = () => {
  return (
    <div className='appointment'>
        <div className='left-group'>
            <div className='doctor-image'>
                <img src='/Doctor image.png' alt='Doctor image' />
            </div>
            
            <div className='appointment-info'>
                <div className='doctor-info'>
                    <div className='doctor-name'>Dr. Richard James</div>
                    <div className='department'> Bác sĩ đa khoa</div>
                </div>
                
                <div className='datetime'>
                    <span className='datetime-title'>Ngày & Giờ: </span>
                    <span>25, Tháng 6, 2024 |  8:30 PM</span>
                </div>
            </div>
        </div>
       

        <div className='right-group'>
            <div className='status'>Đang chờ duyệt</div>
            <WhiteWithBlackBorderBtn 
                text="Hủy lịch hẹn" 
                variant="primary"/>
            </div>
    </div>
  )
}

export default Appointment