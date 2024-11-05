import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../config/apiConfig";
import { ToastError, ToastSuccess } from "../../../Admin/component/ToastNotification/Toast";


const CheckoutConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [numberPayment, setNumberPayment] = useState(null)
  const [urlPayment, setURLPayment] = useState('')
  const [getTicket , setGetTicket] = useState(null)

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [navigate, location.state]);

  useEffect(()=> {
      if(getTicket!= null && numberPayment != null) {
        const addPayment = async () => {
     
          console.log(urlPayment)
          try {
            const res = await axios.post(
              `${API_BASE_URL}/api/PaymentDetails`,DataPayment
            );
            if (res.data.status === "error") {
              ToastError(res.data);
            } else {
              ToastSuccess("Go to payment VNPAY after 3 seconds");
              setTimeout(() => {
                window.location.href = urlPayment
              }, 3000);
            }
          } catch {
            ToastError({ status: "errror" });
          }
    
        };
          addPayment();
      }
  }, [getTicket, numberPayment])
  if (!location.state) {
    return null;
  }

  const getdata = location.state;

  const DataTicket = {
    fullName: getdata.fullName,
    email: getdata.email,
    phone: getdata.phone,
    route_from: getdata.route_from,
    route_to: getdata.route_to,
    scheduleId: getdata.scheduleId,
    dateSchedule: getdata.dateSchedule,
    timeSchedule: getdata.timeSchedule,
    seat_type: getdata.seat_type,
    seat_num: getdata.seat_num,
    codeTicket: getdata.codeTicket,
  }

  const DataMail = {
    fullName: getdata.fullName,
    email: getdata.email,
    phone: getdata.phone,
    route_from: getdata.route_from,
    route_to: getdata.route_to,
    dateSchedule: getdata.dateSchedule,
    timeSchedule: getdata.timeSchedule,
    seat_type: getdata.seat_type,
    seat_num: getdata.seat_num,
    codeTicket: getdata.codeTicket,
    total: getdata.total,
    toEmail: getdata.email,
  }

  const DatagetPayment = {
    orderType: "ticket",
    amount: getdata.total,
    orderDescription: "pay",
    name: getdata.codeSchedule
    
  }

  const DataPayment = {
    total: getdata.total,
    payment_method: "VNPAY",
    transaction_number: numberPayment,
    ticketId: getTicket
  }

  

  const handleSubmit= () => {
    const addTicket = async () => {
      try {
        const res = await axios.post(
          `${API_BASE_URL}/api/Tickets`,DataTicket
        );
        if (res.data.status === "error") {

          ToastError(res.data);
        } else {
          setGetTicket(res.data.id)

        }
      } catch {
        ToastError({ status: "errror" });

      }

    };
    addTicket();

    const getPayment = async () => {
      try {
        const res = await axios.post(
          `${API_BASE_URL}/VnpayPayment`,DatagetPayment
        );
        if (res.data.status === "error") {
          ToastError(res.data);
        } else {
          setNumberPayment(res.data.tick)     
          setURLPayment(res.data.paymentUrl)

        }
      } catch {
        ToastError({ status: "errror" });

      }

    };
    getPayment();

    const sendMail = async () => {
      try {
        const res = await axios.post(
          `${API_BASE_URL}/api/Email/SendMail`,DataMail
        );
        if (res.data.status === "error") {
          ToastError(res.data);
        } else {
        }
      } catch {
        ToastError({ status: "errror" });

      }

    };
    sendMail();


   

   

  }



  return (
    <div className="flex items-center justify-center bg-gray-800 bg-opacity-5 p-4">
      <div className=" grid grid-cols-1 ">
        <div className=" w-[1100px] h-[580px] items-center justify-between   mt-2 bg-white box rounded-md shadow-lg  ">
          <div className="pt-8 pl-4 pr-4">
            <h2 className=" p-1 text-left">
              <span
                className=" p-1.5 text-white font-semibold rounded-md "
                style={{ background: "#04aa6b" }}
              >
                Confirm Train Ticket Booking Infomation
              </span>
            </h2>
          </div>

            <div>
            <div className=" pl-7 pr-7 ">
              <h1 className=" p-1 text-left ">
                <span className=" text-[17px]  font-semibold ml-[-9px] text-gray-800 ">
                Ticket buyer information
                </span>
              </h1>
            </div>
            <div className="text-left pl-10 ">
              <div className="flex font-semibold text-gray-500 text-[16px]">- Full name:  <p className="ml-2 text-gray-800 text-[15px] leading-[24px]">{getdata.fullName}</p></div>
              <div className="flex font-semibold text-gray-500 text-[16px]">- Mobile number: <p className="ml-2  text-gray-800 text-[15px] leading-[24px]">{getdata.phone}</p></div>
              <div className="flex font-semibold text-gray-500 text-[16px]">- Email: <p className="ml-2  text-gray-800 text-[15px] leading-[24px]">{getdata.email}</p></div>
              <div className="flex font-semibold text-gray-500 text-[16px]">- Payment method: <p className="ml-2  text-gray-800 text-[15px] leading-[24px]">Online payment (VNPAY)</p></div>
            </div>
            </div>


          {/* phan bang */}
          <div className=" pl-7 pr-7 ">
              <h1 className=" p-1 text-left ">
                <span className=" text-[17px]  font-semibold ml-[-9px] text-gray-800 ">
                Ticket purchase information
                </span>
              </h1>
            </div>
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
                    <span className=" font-semibold text-gray-500 text-[15px]">
                      {getdata.trainName} {getdata.route_from} -{" "}
                      {getdata.route_to}
                    </span>{" "}
                    <br />
                    <span className="font-semibold text-gray-500 text-[15px]">
                      {getdata.dateSchedule} {getdata.timeSchedule}{" "}
                      {getdata.seat_type} seat {getdata.seat_num}
                    </span>
                    <br />
                  </td>
                  <td className="py-2 px-4 border-r   font-semibold text-gray-500">
                  {getdata.total}
                  </td>
                  <td className="py-2 px-4 border-r text-center font-semibold text-gray-500">
                    0
                  </td>
                  <td className="py-2 px-4 border-r font-semibold text-gray-500 text-[15px]">
                    There are no promotions for this ticket
                  </td>
                  <td className="py-2 px-4 border-r text-center font-semibold text-gray-500">
                    0
                  </td>
                  <td className="py-2 px-4 text-center font-semibold text-gray-500">
                    {getdata.total}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="ml-6">
            
            <div>
              <p className="w-[98%]  text-[15px] font-semibold text-gray-500 text-left">
                Please carefully check and confirm the entered information
                before making a ticket purchase transaction. After making the
                payment transaction on the next page, you will not be able to
                change the above ticket purchase information.
              </p>
            </div>

            <div className=" h-[30px] mt-[40px]">
              <button
                onClick={() => navigate("/booking")}
                className="font-semibold relative font-medium -top-1 -lef-1 hover:top-0 hover:left-0 transition-all  py-1.5 px-9 uppercase text-white before:content-[''] before:absolute before:top-1 before:left-1 before:hover:top-0 before:hover:left-0 before:w-full before:h-full before:border-2 before:border-gray-700 before:-z-10 before:transition-all rounded-md"
                style={{ background: "#04aa6b" }}
              >
                <a>Back</a>
              </button>

              <button
                type="submit" onClick={handleSubmit}
                style={{ background: "#04aa6b" }}
                className=" font-semibold ml-[700px] relative font-medium -top-1 -lef-1 hover:top-0 hover:left-0 transition-all py-1.5 px-9 uppercase text-white before:content-[''] before:absolute before:top-1 before:left-1 before:hover:top-0 before:hover:left-0 before:w-full before:h-full before:border-2 before:border-gray-700 before:-z-10 before:transition-all rounded-md"
              >
                Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutConfirm;
