import React from 'react';
import './LookupTicket.css'
import { useEffect, useState } from 'react';
import {API_BASE_URL} from '../../../config/apiConfig'
import {ToastError, ToastSuccess } from '../../../Admin/component/ToastNotification/Toast'
import axios from 'axios';
import { red } from '@mui/material/colors';
const LookupTicket = () => {
    const [status, setStatus] = useState(false)
    const [infoTicket, setInfoTicket] = useState('')



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
              const res = await axios.post(
                `${API_BASE_URL}/api/Tickets/GetTicket`,Data
              );
              if (res.data.status === "error") {
                ToastError(res.data);
              } else {
                ToastSuccess("Find Ticket");
                setStatus(true)
                setInfoTicket(res.data)
                
              }
            } catch {
              ToastError({ status: "errror" });
            }
      
          };
          payTicket();
        
    }

    return (
        <div className='bg-gray-50 h-auto pt-4 mb-8'>
            <div className='booking-container shadow-lg text-gray-800 p-4 rounded-lg '>
            <div className="booking-title rounded-lg">
                Look up ticket information
            </div>
            <div className="booking-description">
            To look up information, please enter the exact 3 information below.
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
                    <button type="submit" className="search-button hover:bg-emerald-500  bg-emerald-600 text-x m-2 p-1 rounded-lg text-white pl-8 pr-8"
                        
                    >
                        Search
                    </button>
                    <a  className="forgot-link text-base text-green-600 ">
                        Forgot the booking code?
                    </a>
                </div>

                
            </form>


            {status && (<div className='attention mt-4 bg-green-100 pt-0.5 pb-0.5  rounded-lg ml-1 mr-1 '>
            <div className=" pl-7 pr-7 ">
              <h1 className=" p-1 text-left ">
                <span className=" font-bold m-6 mb-0 mt-2 ml-2 text-red-600 text-[17px]">
                Your train ticket information
                </span>
              </h1>
            </div>
           <div className='flex flex-wrap mb-4 mt-2'>
           <div className="text-left pl-10 w-[50%]  ">
              <div className="flex font-semibold text-gray-500 text-[16px]">- Full name:  <p className="ml-2 text-gray-800 text-[15px] leading-[24px]">{infoTicket.fullName}</p></div>
              <div className="flex font-semibold text-gray-500 text-[16px]">- Mobile number: <p className="ml-2  text-gray-800 text-[15px] leading-[24px]">{infoTicket.phone}</p></div>
              <div className="flex font-semibold text-gray-500 text-[16px]">- Email: <p className="ml-2  text-gray-800 text-[15px] leading-[24px]">{infoTicket.email}</p></div>
              <div className="flex font-semibold text-gray-500 text-[16px]">- Payment method: <p className="ml-2  text-gray-800 text-[15px] leading-[24px]">Online payment (VNPAY)</p></div>
              <div className="flex font-semibold text-gray-500 text-[16px]">- Code ticket: <p className="ml-2  text-gray-800 text-[15px] leading-[24px]">{infoTicket.codeTicket}</p></div>
            </div>
            <div className="text-left pl-10 w-[50%] ">
              <div className="flex font-semibold text-gray-500 text-[16px]">- From - To:  <p className="ml-2 text-gray-800 text-[15px] leading-[24px]">{infoTicket.route_from}-{infoTicket.route_to}</p></div>
              <div className="flex font-semibold text-gray-500 text-[16px]">- Date schedule: <p className="ml-2  text-gray-800 text-[15px] leading-[24px]">{infoTicket.dateSchedule}</p></div>
              <div className="flex font-semibold text-gray-500 text-[16px]">- Time schedule:: <p className="ml-2  text-gray-800 text-[15px] leading-[24px]">{infoTicket.timeSchedule}</p></div>
              <div className="flex font-semibold text-gray-500 text-[16px]">- Name Train:  <p className="ml-2 text-gray-800 text-[15px] leading-[24px]">{infoTicket.codeTicket.slice(0, -21)}</p></div>
              <div className="flex font-semibold text-gray-500 text-[16px]">- Seat type: <p className="ml-2  text-gray-800 text-[15px] leading-[24px]">{infoTicket.seat_type}</p></div>
              <div className="flex font-semibold text-gray-500 text-[16px]">- Seat num: <p className="ml-2  text-gray-800 text-[15px] leading-[24px]">{infoTicket.seat_num}</p></div>
            </div>
           </div>
            </div>)}

          
            


            <div className='attention mt-4 '>
                    <p className="font-bold m-6">Note:</p>
                    <p className="m-5 font-semibold text-gray-500 text-left">- Let's see regulations on returning tickets, exchange tickets Tet Giap Thin train 2024 (and Tet train running time), please click <a  href='/' className="text-green-500"  ><strong >come in</strong></a></p>
                    <p className="m-5 font-semibold text-gray-500 text-left">- Let's see regulations on returning tickets, exchange tickets (Applicable from August 30, 2023 to the end of December 31, 2023), please click <a  href='/' className="text-green-500" ><strong >come in</strong></a> </p>
            </div>
        </div>
        </div>
  );
};

export default LookupTicket;
