import React, { useEffect, useState } from 'react';
import AppointmentCard from './layout/AppointmentCard';
import '../styles/My_Appointments_Page.css';
import '../styles/global.css';

const My_Appointments_Page = () => {
  return (
    <div>
        <div className='title'>Danh sách lịch khám</div>
        <div className='appointment-list'>
          <AppointmentCard></AppointmentCard>
          <AppointmentCard></AppointmentCard>
        </div>
    </div>
  )
}

export default My_Appointments_Page