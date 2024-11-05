import React, { useState } from 'react'

const DateInput = ({initialValue}) => {
    const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(initialValue || currentDateString);

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
  }

  return (
    <div className="relative max-w-sm h-[40px]">
    <div className="absolute inset-y-[50px] start-0 flex items-center ps-3.5 pointer-events-none ">
      <svg
        className="w-4 h-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
      </svg>
    </div>
    <input
      type="date"
      id="dateSchedule"
      name="dateSchedule"
      value={selectedDate}
      onChange={handleDateChange}
      required
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Select date"
      min={currentDateString} // Giới hạn chọn từ ngày hiện tại trở đi
    />
  </div>
  )
}

export default DateInput
