import React from 'react'

import { Route, Routes } from 'react-router-dom'
import ListTrain from '../pages/Admin/Train/ListTrain'
import Login from '../customer/components/Account/Login/Login'
import ListStation from '../pages/Admin/Station/ListStation'
import ListSchedule from '../pages/Admin/Schedule/ListSchedule'
import ListTicketPrice from '../pages/Admin/TicketPrice/ListTicketPrice'
import ListUser from '../pages/Admin/User/ListUser'
import ListTicket from '../pages/Admin/Ticket/ListTicket'
import ListPayment from '../pages/Admin/Payment/ListPayment'
import Dashboard from '../pages/Admin/Dashboard/Dashboard'


const AdminRouter = () => {
 

  return (
    <div>
      <div>
      </div>
      <Routes>
      <Route path='/' element={<Dashboard/>}></Route>

         <Route path='/login' element={<Login/>}></Route>
        <Route path='/train' element={<ListTrain/>}></Route>
        <Route path='/station' element={<ListStation/>}></Route>
        <Route path='/schedule' element={<ListSchedule/>}></Route>
        <Route path='/ticketprice' element={<ListTicketPrice/>}></Route>
        <Route path='/user' element={<ListUser/>}></Route>
        <Route path='/ticket' element={<ListTicket/>}></Route>
        <Route path='/payment' element={<ListPayment/>}></Route>








      </Routes>
    </div>
  )
}

export default AdminRouter;
