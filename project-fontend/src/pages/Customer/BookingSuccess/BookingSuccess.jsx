import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../../customer/components/Navbar/Narvar";
import Footer from "../../../customer/components/Footer/Footer";


const BookingSuccess = () => {
  const location = useLocation();

  const transactionNumber = new URLSearchParams(location.search).get(
    "transactionNumber"
  );

  return (
    <Fragment>
      <Navbar />
      <div className="bg-gray-50 h-auto pt-2 pb-4">
        <div className="booking-container bg-white box rounded-md shadow-lg p-4 mt-[30px] mb-[30px] ">
            <svg
              viewBox="0 0 24 24"
              className="text-green-600 w-16 h-16 mx-auto my-6"
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Payment Successful!
              </h3>
              <p classNameName="mt-4 font-semibold text-gray-600"> Transaction Number: <span  >{transactionNumber} </span> </p>
              <p className="text-gray-600 my-2">
                Thank you for completing your secure online payment.
              </p>
              <p> Have a great day! </p>
              <div className="py-10 text-center">
                <a
                   href="/"
                  className="px-12 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 rounded-lg cursor-pointer"
                >
                  GO BACK
                </a>
              </div>
            </div>
          </div>
      </div>
      <Footer/>
    </Fragment>
  );
};

export default BookingSuccess;
