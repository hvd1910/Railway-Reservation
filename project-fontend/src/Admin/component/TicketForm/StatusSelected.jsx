import React, { useEffect, useState } from 'react'

const StatusSelected = ({handleValue}) => {

    

    const [statusValue, setStatusValue] = useState('');


  
    const handleChange = (e) => {
        setStatusValue(e.target.value);
        handleValue(e.target.value)
      };



     
  return (
    <div className="">

    <select
      id="status"
      name='status'
      className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-md h-[30px] mt-
     focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={statusValue}
      onChange={handleChange}
      
    >
         
         <option value="">Status</option>

      <option value="Pending">Pending</option>
      <option value="Booked">Booked</option>
      <option value="Rejected">Rejected</option>
    </select>
  </div>
  )
}

export default StatusSelected
