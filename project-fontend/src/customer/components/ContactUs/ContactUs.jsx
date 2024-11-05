import React from 'react'
import './ContactUs.css'

function ContactUs() {
  return (
    <div className='bg-gray-50 h-auto pt-4 pb-10'>
    <div className='booking-container bg-white box rounded-md shadow-lg p-4 '>
    <div className="booking-title rounded-lg ">
        Contact Us
    </div>

        <div className="contact_header mt-4 grid  md:grid-cols-2 gap-1">
            <div className="contact_btn p-4 rounded">
                <div className="btn_title">
                    <p className="font-bold text-left font-semibold text-gray-500">Vietnam Railway Corporation</p>
                </div>

                <div className="btn_address mt-2">
                    <p className="text-left font-semibold text-gray-500">No. 8A, Ton That Thuyet, My Dinh 2, Hanoi</p>
                </div>

                <div className="btn_content mt-2">
                    <p className=" text-left font-semibold text-gray-500">The certificate of business registration No. 113642 according to the Decision No. 973/QD-TTg dated June 25, 2010 of the Prime Minister.</p><br></br>

                    <p className="text-left font-semibold text-gray-500">Business code: 0110105052, first registered on July 26, 2010, registered for the 4th change on June 27, 2014 at the Department of Planning and Investment of Hanoi City.</p>
                </div>
            </div>

            <div className="contact_top p-4 rounded mt-4 md:mt-0">
                <div className="btn_support">
                    <p className="font-bold text-left font-semibold text-gray-500">Customer support switchboard</p>
                </div>

                <div className="btn_phone mt-2">
                    <p className="text-left font-semibold text-gray-500">Phone: 19001058</p>
                </div>

                <div className="btn_email mt-2">
                    <p className="text-left font-semibold text-gray-500">Email1: <a href="mailto:support1@fpt.com.vn" className="text-blue-500">support1@fpt.com.vn</a><br></br>
                    Email2: <a href="mailto:support2@fpt.com.vn" className="text-blue-500">support2@fpt.com.vn</a>
                    </p>
                </div>

                
            </div>


            
        
        </div>

        <div cla='attention mt-4 5  '>
                    <p className="font-bold m-6 mb-2">Note:</p>
                    <p className="m-5 mt-1 font-semibold text-gray-500">- Let's see  <a  className="text-black-900">Regulations on returning tickets, exchange tickets</a> Tet Giap Thin train 2024 (and Tet train running time) please click <a  href='/' className="text-green-500"  ><strong >come in</strong></a></p>
                    <p className="m-5 font-semibold text-gray-500">- Let's see  <a  className="text-black-900">Regulations on returning tickets,exchange tickets</a> (Applicable from August 30, 2023 to the end of December 31, 2023) Please click <a  href='/' className="text-green-500" ><strong >come in</strong></a> </p>
        </div>

        
      </div>
    </div>

  )
}



export default ContactUs

