import React, { Fragment } from 'react'
import Navbar from '../../../customer/components/Navbar/Narvar'
import LookupTicket from '../../../customer/components/LookupTicket/LookupTicket'
import Footer from "../../../customer/components/Footer/Footer";

const LookupPage = () => {
  return (
    <Fragment>
    <Navbar/>
    <LookupTicket/>
    <Footer/>
  </Fragment>
  )
}

export default LookupPage
