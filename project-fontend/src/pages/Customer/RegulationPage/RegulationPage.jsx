import React, { Fragment } from 'react'
import Navbar from '../../../customer/components/Navbar/Narvar'
import Regulations from '../../../customer/components/Regulation/Regulation'
import Footer from "../../../customer/components/Footer/Footer";


const RegulationPage = () => {
  return (
    <Fragment>
    <Navbar/>
    <Regulations/>
    <Footer/>
  </Fragment>
  )
}

export default RegulationPage
