import React, { Fragment } from 'react'
import Navbar from '../../../customer/components/Navbar/Narvar'
import CheckoutConfirm from '../../../customer/components/CheckoutConfirm/CheckoutConfirm'
import Footer from "../../../customer/components/Footer/Footer";

const CheckoutConfirmPage = () => {
  return (
    <Fragment>
      <Navbar/>
      <CheckoutConfirm/>
      <Footer/>
    </Fragment>
  )
}

export default CheckoutConfirmPage
