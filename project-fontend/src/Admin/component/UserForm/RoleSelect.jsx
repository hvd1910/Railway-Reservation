import React, { useEffect, useState } from 'react'

const RoleSelect = ({value}) => {

    

    const [roleValue, setRoleValue] = useState(value);


  
    const handleChange = (e) => {
        setRoleValue(e.target.value);
      };



     
  return (
    <div className="">
    <label
      htmlFor="ac3"
      className="float-left block mb-2 text-sm font-medium text-gray-900 dark:text-white "
    >
      Role
    </label>
    <select
      id="role"
      name='role'
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={roleValue}
      onChange={handleChange}

    >
      <option value="ADMIN">ADMIN</option>
    </select>
  </div>
  )
}

export default RoleSelect
