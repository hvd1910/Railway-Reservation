import React, { Fragment } from 'react'
import Navbar from '../../../customer/components/Navbar/Narvar'
import PayTicket from '../../../customer/components/PayTicket/PayTicket'
import Footer from "../../../customer/components/Footer/Footer";

const PayTicketPage = () => {
  return (
    <Fragment>
    <Navbar/>
    <PayTicket/>
    <Footer/>
  </Fragment>
  )
}

export default PayTicketPage
