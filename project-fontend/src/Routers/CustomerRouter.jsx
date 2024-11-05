import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Booking from '../pages/Customer/Booking/Booking'
import HomePage from '../pages/Customer/HomePage/HomePage'
import LookupPage from '../pages/Customer/LookupPage/LookupPage'
import PayTicketPage from '../pages/Customer/PayTicketPage/PayTicketPage'
import CheckoutPage from '../pages/Customer/CheckoutPage/CheckoutPage'
import CheckoutConfirmPage from '../pages/Customer/CheckoutConfirmPage/CheckoutConfirmPage'
import BookingSuccess from '../pages/Customer/BookingSuccess/BookingSuccess'
import RegulationPage from '../pages/Customer/RegulationPage/RegulationPage'
import ContactUsPage from '../pages/Customer/ContactUsPage/ContactUsPage'




const CustomerRouter = () => {
  return (
    <div>
      <div>
      </div>
      <Routes>
      <Route path='/contact-us' element={<ContactUsPage/>}></Route>
      <Route path='/regulation' element={<RegulationPage/>}></Route>
      <Route path='/payment' element={<BookingSuccess/>}></Route>
      <Route path='/checkout/confirm' element={<CheckoutConfirmPage/>}></Route>
      <Route path='/checkout' element={<CheckoutPage/>}></Route>
      <Route path='/pay-ticket' element={<PayTicketPage/>}></Route>
      <Route path='/find-ticket' element={<LookupPage/>}></Route>
      <Route path='/booking' element={<Booking/>}></Route>
      <Route path='/' element={<HomePage/>}></Route>


    
      </Routes>
    </div>
  )
}

export default CustomerRouter
