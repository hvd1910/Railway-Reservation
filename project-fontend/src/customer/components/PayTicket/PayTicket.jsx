import React from 'react';
import './PayTicket.css'
import {  useState } from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../../config/apiConfig'
import {ToastError, ToastSuccess } from '../../../Admin/component/ToastNotification/Toast'
const PayTicket = () => {

    const [status, setStatus] = useState(false)
    const [codeTicket, setCodeTicket] = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const data = new FormData(e.currentTarget);
        const  Data= {
            codeTicket: data.get("codeTicket"),
            email: data.get("email"),
            phone: data.get("phone"),
        };

        

        const payTicket = async () => {
     
          
            try {
              const res = await axios.put(
                `${API_BASE_URL}/api/Tickets/status/code`,Data
              );
              if (res.data.status === "error") {
                ToastError(res.data);
                setStatus(false)

              } else {
                ToastSuccess("Pay Ticket");
                setStatus(true)
                setCodeTicket(Data.codeTicket)
                
              }
            } catch {
              ToastError({ status: "errror" });
              setStatus(false)
            }
      
          };
          payTicket();
        
    }

    return (
        <div className='bg-gray-50 h-auto pt-4 pb-10'>
            <div className='booking-container bg-white box rounded-md shadow-lg p-4 '>
            <div className="booking-title rounded-lg ">
                Pay Ticket
            </div>
            <div className='check-ticket-btn bg-green-100  p-4 mt-0 ml-1 mr-1   rounded-lg '>
        <p className='font-semibold text-gray-500 text-left'>- According to the regulations of the Vietnam Railway Corporation, passengers have identification information coinciding with information on electronic tickets to be eligible to enter the station on boardAccording to the regulations of Vietnam Railway Corporation, passengers must have identification information that matches the information on the electronic ticket to be eligible to enter the train station and the ticket return time must be at least 24 hours before the train departs.</p>
        <p className='font-semibold text-gray-500 text-left'>- To ensure the rights of passengers, avoid buying fake tickets, or tickets not in accordance with the regulations, you can check your electronic tickets by filling out the following information.</p>
      </div>
            <div className="booking-description font-semibold">
            To pay for ticket, please enter the exact 3 information below.
            </div>
          
            <form className="booking-form" onSubmit={handleSubmit}>
                <div className="input-container">
                    <label htmlFor="bookingCode" className="label font-bold">
                         Ticket code<span className="required text-red-500"  >*</span>
                    </label>
                    <input name='codeTicket' type="text" required id="codeTicket" className="input" placeholder='Ticket code when booking' 
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="email" className="label font-bold">
                        Email<span className="required  text-red-500 ">*</span>
                    </label>
                    <input name='email' type="email" required id="email" className="input" placeholder='Email address when booking, leaving blank if not imported when booking' 
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="phone" className="label font-bold">
                        Phone<span className="required text-red-500">*</span>
                    </label>
                    <input maxLength={10} type="number" id="phone" name='phone' required className="input" placeholder='Phone number when booking, blank if not imported when booking' 
                    />
                </div>

                <div className="button-container text-center   ">
                    <label className="label "></label>
                    <button type="submit" className="search-button hover:bg-emerald-500  bg-emerald-600  text-x m-2 p-1 rounded-lg text-white pl-5 pr-5"
                        
                    >
                        Pay Ticket
                    </button>
                    <a className="forgot-link text-base text-green-600 ">
                        Forgot the booking code?
                    </a>
                </div>

                

            </form>
 
           {status && ( <div className='attention mt-4 bg-green-100 pt-0.5 pb-0.5  rounded-lg ml-1 mr-1 '>
                    <p className="font-bold m-6 mb-0 mt-2 text-red-600">Notication:</p>
                    <p className="ml-5 mr-5 mt-2 font-semibold text-gray-500 text-left pl-4 pr-4 ">  The train ticket with ticket code <span className='text-red-600 font-bold ' >{codeTicket}</span> has been confirmed to be returned successfully.</p>
                    <p className="ml-5 mr-5 mb-3 font-semibold text-gray-500 text-left pl-4 pr-4">   Please go to the nearest train station to complete the procedure to receive a 90% refund of the ticket. </p>
            </div>)}

            <div className='attention mt-4 '>
                    <p className="font-bold m-6 mb-0">Note:</p>
                    <p className="m-5 font-semibold text-gray-500 text-left mt-2">- Let's see regulations on returning tickets, exchange tickets Tet Giap Thin train 2024 (and Tet train running time), please click <a  href='/' className="text-green-500"  ><strong >come in</strong></a></p>
                    <p className="m-5 font-semibold text-gray-500 text-left">- Let's see regulations on returning tickets, exchange tickets (Applicable from August 30, 2023 to the end of December 31, 2023), please click <a  href='/' className="text-green-500" ><strong >come in</strong></a> </p>
            </div>
        </div>
        </div>
  );
};

export default PayTicket;
