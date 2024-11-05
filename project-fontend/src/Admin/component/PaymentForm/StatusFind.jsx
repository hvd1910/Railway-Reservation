import React, { useEffect, useState } from 'react'

const StatusFind = ({handleValue}) => {

    

    const [statusValue, setStatusValue] = useState('');


  
    const handleChange = (e) => {
        setStatusValue(e.target.value);
        handleValue(e.target.value)
      };



     
  return (
    <div className="mr-3">

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
      <option value="Approved">Approved</option>
      <option value="Rejected">Rejected</option>
      <option value="Refund">Refund</option>
      <option value="Compensated">Compensated</option>
    </select>
  </div>
  )
}

export default StatusFind
