import React from 'react';
import '../../styles/AppointmentCard.css';
import SharpCornerBlackBorderBtn from './SharpCornerBlackBorderBtn';
import "../../styles/SharpCornerBlackBorderBtn.css" 

const AppointmentCard = ({appointment}) => {
    if (!appointment || !appointment.doctor) {
        console.log("Dữ liệu không đủ cho AppointmentCard:", appointment);
        return null; // Tránh render nếu dữ liệu không đầy đủ
      }

    const { doctor, appointmentTime, status } = appointment;

     const getStatusClass = (status) => {
        switch (status) {
            case "Chờ duyệt":
                return "pending";
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
                    <img src={doctor.profileImage} alt={doctor.name} />
                </div>
                
                <div className='appointment-info'>
                    <div className='doctor-info'>
                        <div className='doctor-name'>{doctor.name}</div>
                        <div className='specialty'>{doctor.specialty}</div>
                    </div>
                    
                    <div className='datetime'>
                        <span className='datetime-title'>Ngày & Giờ: </span>
                        <span>{new Date(appointmentTime).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        

            <div className='right-group'>
                <div className={`status ${getStatusClass(status)}`}>{status}</div>
                <SharpCornerBlackBorderBtn className='sharp-corner-black-border-btn' 
                    text="Hủy lịch hẹn" 
                    disabled={status === "Được duyệt" || "Chờ duyệt"} 
                    variant="primary"/>
            </div>
    </div>
  )
}

export default AppointmentCard