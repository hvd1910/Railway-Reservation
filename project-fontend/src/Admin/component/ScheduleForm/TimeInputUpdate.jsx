import React, { useState } from 'react'

const TimeInput = ({initialValue}) => {
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split("T")[0];

    const [selectedTime, setSelectedTime] = useState(initialValue || ''); // Sử dụng hook useState để quản lý trạng thái thời gian

    const handleTimeChange = (event) => {
        const newTime = event.target.value;
        setSelectedTime(newTime);
    }    
  return (
    <div className="relative">
    <input
      type="time"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      id="timeSchedule"
      name="timeSchedule"
      value={selectedTime}
      onChange={handleTimeChange}
      max="23:59"
      required
    />
    <label
      htmlFor="timeSchedule"
      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
    ></label>
  </div>
  )
}

export default TimeInput
