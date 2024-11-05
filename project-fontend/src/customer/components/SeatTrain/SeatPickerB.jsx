import React, { useState, useEffect } from 'react';
import Seat from './Seat';
import {API_BASE_URL} from '../../../config/apiConfig'
import axios from 'axios';

const SeatPickerB = ({nameObject,scheduleId, selected}) => {
  const totalSeats = 33;
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);



  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/Tickets/countTicket?seatType=${nameObject}&scheduleId=${scheduleId}`);
        
        if(res.data.status !== "error") {
          setBookedSeats(res.data)
        }
        
      } catch {
      }
    };

    fetchPost()
  }, [nameObject]);

 

  const isSeatBooked = (seatNumber) => {
    return bookedSeats.some((seat) => seat.seat_num === seatNumber);
  };

  const handleSeatSelect = (seatNumber) => {

    if (!isSeatBooked(seatNumber)) {
      setSelectedSeat(seatNumber);
      selected(seatNumber)

    }
  };
  return (
    <div>
      <h1 className='pl-0 text-center mb-2 font-semibold text-xl text-gray-800'>The bed is in a compartment with 6 air conditioners</h1>
      <div className="flex flex-wrap h-[280px] w-[650px] rounded-3xl border-[3px] border border-solid border-emerald-600 p-3 ">
        {Array.from({ length: totalSeats }).map((_, index) => (
          <Seat
            key={index}
            seatNumber={index + 1}
            isSelected={selectedSeat === index + 1}
            isBooked={isSeatBooked(index + 1)}
            onSelect={handleSeatSelect}
            className={index + 1 === 12 ? 'mb-10' : ''}
          />
        ))}
      </div>
    </div>
  );
};

export default SeatPickerB;