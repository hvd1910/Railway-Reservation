import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'

const Input = ({name, value, label, type,}) => {

    const [ac3Value, setAc3Value] = useState(value);

    const handleInputChange = (e) => {
            setAc3Value(e.target.value);
    }

    useEffect(()=> {
        setAc3Value(value)
    },[value])


  return (
    <div className="">
                  <label
                    htmlFor={name}
                    className="float-left block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                  >
                    {label}
                  </label>
                  <TextField  size='small' type={type}  id={name} value={ac3Value}  name={name} placeholder={name}  required
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
  )
}

export default Input
