import React, { useEffect, useState } from "react";
import Vnpay from '../images/Vnpay.png'
import Paypoo from '../images/Paypoo.png'
import Zalopay from '../images/Zalopay.png'
import IconCheck from '../images/iconCheck.png'
import { useLocation, useNavigate } from "react-router-dom";
import Fare from "./Fare";
import { sumDigits } from "../../../Admin/component/ScheduleForm/convertDate"

const Checkout = () => {

    
    const navigate = useNavigate();
    const location = useLocation();
    const [total, setTotal] = useState(0)


   const getRandomThreeDigitNumber = ()=> {
      return Math.floor(Math.random() * 900) + 100;
    }
 
    const random = getRandomThreeDigitNumber()
    useEffect(() => {
        if (!location.state) {
          navigate('/');
        }
      }, [navigate, location.state]);

      if (!location.state) {
        return null; // hoặc return một component/loading spinner
      }

    const getdata = location.state

    const handleTotal = (gettotal) => {
        setTotal(gettotal)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const  Data= {
        fullName: data.get("fullName"),
        email: data.get("email"),
        phone: data.get("phone"),
        route_from: getdata.route_from,
        route_to: getdata.route_to,
        scheduleId: getdata.scheduleId,
        dateSchedule: getdata.dateSchedule,
        timeSchedule: getdata.timeSchedule,
        seat_type: getdata.seat_type,
        seat_num: getdata.seat_num,
        codeSchedule: getdata.codeSchedule,
        codeTicket: `${getdata.codeSchedule}${getdata.seat_type.toUpperCase()}${getdata.seat_num}${random} `,
        total: total,
    };

    navigate("/checkout/confirm", {state: Data})

    }
    

  return (
    <div className="flex items-center justify-center bg-gray-800 bg-opacity-5 p-4">
      <div className=" grid grid-cols-1 ">
        <div className=" w-[1100px] h-[1150px] items-center justify-between   mt-4 bg-white box rounded-md shadow-lg  ">
          <div className="pt-8 pl-4 pr-4">
            <h2 className=" p-1 text-left">
         
              <span className=" p-2 text-white font-semibold rounded-md text-x" style={{background: "#04aa6b"}}>
              TICKET CART INFORMATION
              </span>
            </h2>
          </div>

          <div className="h-[130px] bg-green-100 m-3 rounded-md w-[96.3%] ml-5 mr-5 mb-6">
            <p className="p-5 font-semibold text-gray-500 text-left">
              Please fill in all information about the train passenger
              completely and accurately, including: Full name, identification
              number (ID card number or passport number or driving license
              number). ID card recognized by Vietnamese law or date of birth if
              a child or student card if a student). To ensure safety and
              transparency in the ticket selling process, this information will
              be checked by the ticket checker before boarding the train in
              accordance with the regulations of Vietnam Railways Corporation.
            </p>
          </div>

          {/* phan bang */}
          <div className="container mx-auto m-3 w-[99%] mr-4 ">
            <table className="w-[97%] bg-white border border-gray-300 ml-5">
              <thead>
                <tr>
                  <th className="py-4 px-4 border-r border-b font-semibold text-[17px]">
                    Location information
                  </th>
                  <th className="py-2 px-4 border-r border-b  font-semibold text-[17px]">
                    Fare
                  </th>
                  <th className="py-2 px-4 border-r border-b font-semibold text-[17px]">
                    Reduce objects
                  </th>
                  <th className="py-2 px-4 border-r border-b font-semibold text-[17px]">
                    Promotion
                  </th>
                  <th className="py-2 px-4 border-r border-b font-semibold text-[17px]">
                    Insurance
                  </th>
                  <th className="py-2 px-4 border-b font-semibold text-[17px]">
                    <span>Total</span>
                    <br />
                    <span>(VNĐ)</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-r">
                    <span className=" font-semibold text-gray-500">
                      {getdata.trainName} {getdata.route_from} - {getdata.route_to}
                    </span>{" "}
                    <br />
                    <span className="font-semibold text-gray-500">
                      {getdata.date_schedule} {getdata.timeSchedule} {getdata.seat_type} seat  {getdata.seat_num}
                    </span>
                    <br />
                  </td>
                  <td className="py-2 px-4 border-r   font-semibold text-gray-500">
                    <Fare nameTicket={getdata.seat_type} distance={getdata.distance} total={handleTotal}/>
                  </td>
                  <td className="py-2 px-4 border-r text-center font-semibold text-gray-500">
                    0
                  </td>
                  <td className="py-2 px-4 border-r font-semibold text-gray-500">
                    There are no promotions for this ticket
                  </td>
                  <td className="py-2 px-4 border-r text-center font-semibold text-gray-500">
                    0
                  </td>
                  <td className="py-2 px-4 text-center font-semibold text-gray-500">
                    {total}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="ml-6">
            <div className="pt-10 pl-1 ">
              <h1 className=" p-1 ">
                <span className=" text-xl  font-semibold ml-[-9px]">
                  Ticket booking information
                </span>
              </h1>
            </div>
            <div>
              <p className="w-[98%]  font-semibold text-gray-500 text-left">
                Please fill in completely and accurately the information about
                the ticket buyer below. This information will be used to verify
                ticket buyers and pick up tickets at the station before boarding
                the train in accordance with regulations.
              </p>
            </div>

           <form onSubmit={handleSubmit} >
           <div className="mt-10  block ">
              <label
                htmlFor="title"
                className=" font-popi   text-sm font-semibold text-black-300"
              >
                FullName
              </label>
              <input
                type="text"
                id="title"
                name="fullName"
                required
                placeholder="Nguyen Van A"
                className="border-2 p-1 ml-16 w-[280px] rounded-sd FullName text-sm font-semibold  p-2  rounded-md"
              />

              <label
                htmlFor="title"
                className=" font-popi ml-20  font-semibold font-semibold"
              >
                E-mail
              </label>
              <input
                type="email"
                name="email"
                required
                id="title"
                placeholder="admin@gmail.com"
                className="border-2 p-1 ml-20 w-[330px] rounded-sd  font-semibold text-sm p-2  rounded-md"
              />
            </div>

            <div className="mt-10  block ">
              <label
                htmlFor="title"
                className=" font-popi   text-sm font-semibold text-black-300 mr-6"
              >
                Phone
              </label>
              <input
                type="text"
                id="title"
                name="phone"
                required
                maxLength={10}
                placeholder="09890682728 "
                className="border-2 p-1 ml-16 w-[280px] rounded-sd FullName text-sm font-semibold  p-2  rounded-md"
              />

              <label
                htmlFor="title"
                className=" font-popi ml-20  font-semibold font-semibold"
              >
                Description
              </label>
              <input
                type="text"
                id="title"
                placeholder="May not need to be filled out"
                className="border-2 p-1 ml-11 w-[330px] rounded-sd  font-semibold text-sm p-2  rounded-md"
              />
            </div>
          


            <section className=" mx-auto px-8 pt-10">
              <h1 className=" p-5 ">
                <span className=" text-xl  font-semibold   text-center">
                  Payment methods
                </span>
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <label
                  htmlFor="payment1"
                  className="relative w-full cursor-pointer"
                >
                  <input
                    type="radio"
                    id="payment1"
                    name="payment"
                    className="peer hidden"
                    defaultChecked
                  />
                  <div className="payment-content  flex items-center sm:justify-center p-5 pr-16 sm:p-8 gap-5  h-24 sm:h-40 w-full  bg-white border-2 border-gray-100 rounded-md transition peer-checked:border-green-500 peer-checked:shadow-lg  peer-checked:-translate-y-1">
                    <img
                      src={Vnpay}
                      alt="mastercard"
                      className="payment-image 
              "
                    />
                    <p className=" static sm:absolute top-full sm:mt-1 text-center text-lg sm:text-base  sm:w-full opacity-70  pt-2">
                      Pay online via VNPay payment gateway
                    </p>
                  </div>
                  <div className="payment-checked absolute top-1/2 sm:-top-4 right-6 sm:right-[-10px] -translate-y-1/2 sm:translate-y-0 -mt-1  bg-green-500 text-white h-7 w-7 p-0.5 rounded-full transition peer-checked:scale-90 scale-0">
                    <img
                      src={IconCheck}
                      alt=""
                      className="pt-[3.5px] pl-[3.5px]  "
                      
                    />
                  </div>
                </label>

                <label
                  htmlFor="payment1"
                  className="relative w-full cursor-pointer"
                >
                  <input
                    type="radio"
                    id="payment1"
                    className="peer hidden"
                  />
                  <div className="payment-content  flex items-center sm:justify-center p-5 pr-16 sm:p-8 gap-5  h-24 sm:h-40 w-full  bg-white border-2 border-gray-200 rounded-md transition peer-checked:border-blue-500 peer-checked:shadow-lg  peer-checked:-translate-y-1">
                    <img
                      src={Paypoo}
                      alt="mastercard"
                      className="payment-image 
              "
                    />
                    <p className=" static sm:absolute top-full sm:mt-1 text-center text-lg sm:text-base  sm:w-full opacity-70  pt-2">
                      Pay online via Payoo payment gateway
                    </p>
                  </div>
                  <div className="payment-checked absolute top-1/2 sm:-top-4 right-6 sm:right-[-10px] -translate-y-1/2 sm:translate-y-0 -mt-1  bg-blue-500 text-white h-8 w-8 p-0.5 rounded-full transition peer-checked:scale-100 scale-0">
                    <img
                      src={IconCheck}
                      alt=""
                      className="pt-[6px] pl-[5px] w-["
                    />
                  </div>
                </label>

                <label
                  htmlFor="payment1"
                  className="relative w-full cursor-pointer"
                >
                  <input
                    type="radio"
                    id="payment1"
                    className="peer hidden"
                  />
                  <div className="payment-content  flex items-center sm:justify-center p-5 pr-16 sm:p-8 gap-5  h-24 sm:h-40 w-full  bg-white border-2 border-gray-200 rounded-md transition peer-checked:border-blue-500 peer-checked:shadow-lg  peer-checked:-translate-y-1">
                    <img
                      src={Zalopay}
                      alt="mastercard"
                      className="payment-image w-[150px]" style={{objectFit: "cover"}}
                    />
                    <p className=" static sm:absolute top-full sm:mt-1 text-center text-lg sm:text-base  sm:w-full opacity-70  pt-2">
                      Pay online via ZaloPay e-wallet
                    </p>
                  </div>
                  <div className="payment-checked absolute top-1/2 sm:-top-4 right-6 sm:right-[-10px] -translate-y-1/2 sm:translate-y-0 -mt-1  bg-blue-500 text-white h-8 w-8 p-0.5 rounded-full transition peer-checked:scale-100 scale-0">
                    <img
                      src={IconCheck}
                      alt=""
                      className="pt-[6px] pl-[5px]"
                    />
                  </div>
                </label>
              </div>
            </section>

            <div className=" h-[30px] mt-[100px]">
              <button onClick={()=> navigate('/booking')} style={{ background: "#04aa6b" }} className="font-semibold relative font-medium -top-1 -lef-1 hover:top-0 hover:left-0 transition-all  py-1.5 px-9 uppercase text-white before:content-[''] before:absolute before:top-1 before:left-1 before:hover:top-0 before:hover:left-0 before:w-full before:h-full before:border-2 before:border-gray-700 before:-z-10 before:transition-all rounded-md">
                <a >Back</a>
              </button>

              <button type="submit"  style={{ background: "#04aa6b" }} className=" font-semibold ml-[700px] relative font-medium -top-1 -lef-1 hover:top-0 hover:left-0 transition-all  py-1.5 px-9 uppercase text-white before:content-[''] before:absolute before:top-1 before:left-1 before:hover:top-0 before:hover:left-0 before:w-full before:h-full before:border-2 before:border-gray-700 before:-z-10 before:transition-all rounded-md">
                    Next
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
