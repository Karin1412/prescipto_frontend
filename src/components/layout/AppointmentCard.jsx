import React from 'react';
import '../../styles/AppointmentCard.css';
import SharpCornerBlackBorderBtn from './SharpCornerBlackBorderBtn';
import "../../styles/SharpCornerBlackBorderBtn.css" 

const AppointmentCard = ({appointment}) => {
    if (!appointment || !appointment.doctorId) {
        console.log("Dữ liệu không đủ cho AppointmentCard:", appointment);
        return null; // Tránh render nếu dữ liệu không đầy đủ
      }

    const { doctorId, appointmentTime, status } = appointment;

     // Chuyển trạng thái thành class tương ứng
     const getStatusClass = (status) => {
        switch (status) {
            case "Chờ duyệt":
                return "Pending";
            case "Đã khám":
                return "completed";
            case "Đã hủy":
                return "cancelled";
            case "Bị từ chối":
                return "rejected";
            case "Được duyệt":
                return "accepted";    
            default:
                return "";
        }
    };

    return (
        <div className='appointment'>
            <div className='left-group'>
                <div className='doctor-image'>
                    <img src={doctorId.image} alt={doctorId.name} />
                </div>
                
                <div className='appointment-info'>
                    <div className='doctor-info'>
                        <div className='doctor-name'>{doctorId.name}</div>
                        <div className='specialty'>{doctorId.specialty}</div>
                    </div>
                    
                    <div className='datetime'>
                        <span className='datetime-title'>Ngày & Giờ: </span>
                        <span>{appointmentTime}</span>
                    </div>
                </div>
            </div>
        

            <div className='right-group'>
                <div className={`status ${getStatusClass(status)}`}>{status}</div>
                <SharpCornerBlackBorderBtn className='sharp-corner-black-border-btn' 
                    text="Hủy lịch hẹn" 
                    variant="primary"/>
            </div>
    </div>
  )
}

export default AppointmentCard