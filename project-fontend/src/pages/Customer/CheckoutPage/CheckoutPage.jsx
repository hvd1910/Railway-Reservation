import React, { Fragment } from 'react'
import Navbar from '../../../customer/components/Navbar/Narvar'
import Checkout from '../../../customer/components/Checkout/Checkout'
import Footer from "../../../customer/components/Footer/Footer";


const CheckoutPage = () => {
  return (
    <Fragment>
      <Navbar/>
      <Checkout/>
      <Footer/>
    </Fragment>
  )
}

export default CheckoutPage
