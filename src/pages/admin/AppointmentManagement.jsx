import React from 'react'
import AppointmentList from '../../components/layout/AppointmentList'


const AppointmentManagement = () => {
  return (
    <div className="flex flex-row gap-5 mt-7">
        <div className='w-1/6 ml-6'>
            //Admin nav
        </div>
        <div className='w-5/6 mr-6'>
            <div className='display flex flex-row justify-between'>
                <span className="uppercase font-medium text-2xl h-auto w-auto text-[#2A2A2A] mb-7 font-raleway">Danh sách Lịch khám</span>
               
            </div>
            <AppointmentList />
        </div>
    </div>
  )
}

export default AppointmentManagement