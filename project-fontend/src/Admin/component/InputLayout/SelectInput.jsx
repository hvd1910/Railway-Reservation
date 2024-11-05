import React, { useEffect, useState } from 'react'

const SelectInput = ({deleteValue}) => {

    

    const [deleteFlagValue, setDeleteFlagValue] = useState(deleteValue);


  
    const handleChange = (e) => {
        setDeleteFlagValue(e.target.value);
      };



     
  return (
    <div className="">
    <label
      htmlFor="ac3"
      className="float-left block mb-2 text-sm font-medium text-gray-900 dark:text-white "
    >
      Delete Flag
    </label>
    <select
      id="countries_disabled"
      name='delete_flag'
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={deleteFlagValue}
      onChange={handleChange}

    >
      <option value="true">True</option>
      <option value="false">False</option>
    </select>
  </div>
  )
}

export default SelectInput
