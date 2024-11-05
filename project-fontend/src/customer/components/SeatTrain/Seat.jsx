import React from 'react';

const Seat = ({ seatNumber, isSelected, isBooked, onSelect, className }) => {
  const seatClass = isBooked
    ? 'bg-gray-500 cursor-not-allowed'
    : isSelected
    ? 'bg-red-500'
    : 'bg-green-500';

  return (
    <div
      className={`w-10 h-10 m-2 flex items-center justify-center cursor-pointer ${seatClass} ${className} ` }
      onClick={() => onSelect(seatNumber)}
    >
      {seatNumber}
    </div>
  );
};

export default Seat;