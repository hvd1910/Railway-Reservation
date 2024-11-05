import React, { Fragment, useEffect, useState } from "react";
import TrainInfo from "../../../customer/components/TrainInfo/TrainInfo";
import { Grid } from "@mui/material";
import CapinPicker from "../../../customer/components/CabinTrain/CapinPicker";
import SeatPicker from "../../../customer/components/SeatTrain/SeatPicker";
import SeatPickerB from "../../../customer/components/SeatTrain/SeatPickerB";
import SeatPickerC from "../../../customer/components/SeatTrain/SeatTicketC";
import Navbar from "../../../customer/components/Navbar/Narvar";
import {  useLocation, useNavigate } from "react-router-dom";
import {convertDateString} from '../../../Admin/component/ScheduleForm/convertDate'
import Footer from "../../../customer/components/Footer/Footer";
import SeatBlock from "./images/seatBlock.png"
import SeatSelect from "./images/seatSelect.png"
import SeatBlank from "./images/seatBlank.png"
import CapinBlank from './images/CabinBlank.png'
import CapinSelect from './images/CabinSelect.png'


const Booking = () => {
 
  const navigate = useNavigate();
  const location = useLocation();
  
  
  const [numCompartment, setNumCompartment] = useState('ac11')
  const [numberSeat, setNumSeat] = useState(null)
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [trainName, setTrainName] = useState('')
  const [timeSchedule, setTimeSchedule] = useState('')
  const [distance, setDistance] = useState(0)
  const [codeSchedule, setCodeSchedule] = useState('')
  const [scheduleId, setScheduleId] = useState(null)


  const [trainTicket, setTrainTicket] = useState(null)

  useEffect(() => {
    if (!location.state) {
      navigate('/');
    }
  }, [navigate, location.state]);


  if (!location.state) {
    return null; // hoặc return một component/loading spinner
  }
  const {route_from, route_to, date_schedule} = location.state

  
  const infoSchedule = {
    route_from: route_from,
    route_to: route_to,
    date_schedule: date_schedule
  }
  


  const dataTicket = {
    route_from: route_from,
    route_to: route_to,
    scheduleId: scheduleId,
    codeSchedule: codeSchedule,
    dateSchedule: convertDateString(date_schedule),
    timeSchedule: timeSchedule,
    distance: distance,
    trainName: trainName, 
    seat_type: numCompartment,
    seat_num: numberSeat
    
}



  const handleTrainSelect = (dataTrain) => {
    setSelectedTrain(dataTrain.trainNumber);
    setScheduleId(dataTrain.scheduleId)
    setTrainName(dataTrain.trainName)
    setTimeSchedule(dataTrain.timeSchedule)
    setDistance(dataTrain.distance)
    setCodeSchedule(dataTrain.codeSchedule)
  };

  
  const getNumberCompartment = (number) => {
    setNumCompartment(number)
  }
  const getNumSeat = (numberSeat) => {
    setNumSeat(numberSeat)
  }


  const handleSubmit = ()=> {
    if(dataTicket.seat_num != null ) {
      navigate("/checkout", {state: dataTicket})
    }

  }

  
  
  return (
    <Fragment>
      <Navbar/>
      <div className="bg-gray-50">
      <div className="h-auto flex  justify-center pt-2 pb-6 ">
        <div className="max-w-1100 w-[1100px] flex justify-between h-[700px]">
          <div className="w-[75%] bg-white h-auto pl-3 shadow-lg rounded-md">
          <div className="text-left font-semibold w-[390px] mt-4 p-1 ml-2 shadow-md bg-emerald-500  rounded-tr-md rounded-br text-md">
          <h2>Departure: {convertDateString(date_schedule)} from {route_from} to {route_to}</h2>
          </div>
            <div className="w-[full]  flex flex-wrap">
              <TrainInfo infoSchedule={infoSchedule} onSelect={handleTrainSelect}/>
            </div>
            {selectedTrain != null && 
              <div className="w-[full]  flex flex-wrap">
              <CapinPicker onSelect={getNumberCompartment} idTrain={selectedTrain}/>
              </div>
            }

           {selectedTrain != null && 
           
            <div className="w-[full]  flex flex-wrap mt-8 justify-center">
            {numCompartment.slice(0, -1) === "ac1" && <SeatPicker nameObject={numCompartment} scheduleId={scheduleId}  selected={getNumSeat}/> }
            {numCompartment.slice(0, -1) === "ac2" && <SeatPickerB nameObject={numCompartment} scheduleId={scheduleId} selected={getNumSeat}/>}
            {numCompartment.slice(0, -1) === "ac3" && <SeatPickerC nameObject={numCompartment} scheduleId={scheduleId} selected={getNumSeat}/>}
          </div>
           }
          </div>
          <div className="w-[24%] ">
            <div id="summary" className=" px-6 py-6 bg-white shadow-lg rounded-md">
              <h1 className="font-semibold text-2xl border-b pb-2 pl-0 ">
              Ticket cart
              </h1>
             { dataTicket.seat_num != null && 
              <div className="flex justify-between mt-2 mb-3 ">
              <span className="font-semibold text-[15px] text-left ">
                <p >{dataTicket.trainName + ' ' + dataTicket.route_from + ' - ' + dataTicket.route_to}</p>
                <p>{dataTicket.dateSchedule + ' ' + dataTicket.timeSchedule}</p>
                <p>{dataTicket.seat_type}  seat  {dataTicket.seat_num}</p>
              </span>
            </div> }
            
           
              <div className="border-t mt-8 mb-2">
                
                <button onClick={handleSubmit} className="bg-emerald-600 font-semibold hover:bg-emerald-700 py-3 text-sm text-white uppercase w-full">
                Buy ticket
                </button>
              </div>
            </div>
            <div id="summary" className=" px-6 py-6 bg-white shadow-lg rounded-md mt-6">
              <h1 className="font-semibold text-xl border-b pb-2 pl-0 ">
              Guild Ticket Booking
              </h1>
             
              <div className=" mt-2 mb-3 ">
              <div className="flex flex-wrap mb-2 mt-4">
                      <img src={CapinBlank} alt="" className="w-[40px]"/>
                      <p className="flex items-center ml-2 font-semibold text-[15px]  h-[23px] ">The car still has tickets</p>
                  </div>
                <div className="flex flex-wrap mb-2">
                      <img src={CapinSelect} alt="" className="w-[40px] h-[23px]"/>
                      <p className="flex items-center ml-2 font-semibold text-[15px] w-[160px] text-left">The prescription is being selected</p>
                  </div>
                 
            </div> 
            
            
            
           
              <div className="border-t mt-8">
                
          
              </div>
              <div className=" mt-4 mb-20 ">
              <div className="flex flex-wrap mb-2">
                      <img src={SeatBlank} alt="" className="w-[37px] h-[37px]"/>
                      <p className="flex items-center ml-2 font-semibold text-[15px] ">Blank</p>
                  </div>
                <div className="flex flex-wrap mb-2">
                      <img src={SeatSelect} alt="" className="w-[34px] h-[34px]"/>
                      <p className="flex items-center ml-2 font-semibold text-[15px]">Place selected</p>
                  </div>
                  <div className="flex flex-wrap">
                      <img src={SeatBlock} alt="" className="w-[34px] h-[30px]"/>
                      <p className="flex items-center ml-2 font-semibold text-[15px]">Place sold, not for sale</p>
                  </div>
                 
            </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </Fragment>
    
  );
};

export default Booking;
