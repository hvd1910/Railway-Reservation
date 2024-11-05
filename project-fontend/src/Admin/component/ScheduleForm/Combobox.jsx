import { Autocomplete, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../../config/apiConfig';
import axios from 'axios';
import { ToastSuccess, ToastError } from '../ToastNotification/Toast';

const Combobox = ({nameobject, initialValue}) => {
    const [selectedValue, setSelectedValue] = useState(initialValue || null);
    const [station, setStation] = useState([])
    const jwtGetData = localStorage.getItem("jwt")
    const handleOnChange = (event, newValue) => {
    setSelectedValue(newValue);
  };



  const data = station.map(item => (item.stationName))

   useEffect(()=> {
    const fetchPost = async () => {
        try {
          const res = await axios.get(
            `${API_BASE_URL}/api/Stations`);
          if(res.data.status ==="error") {
            ToastError()
            console.log("lỗi")
          }else {
            setStation(res.data)
            
          }
        } catch {
          console.error("lỗi 2");
        }
      };
    
      fetchPost();

   }, [])

  return (
    <Autocomplete
      disablePortal
      id={nameobject}
      name={nameobject}
      options={data}
      value={selectedValue}
      onChange={handleOnChange}
      renderInput={(params) => <TextField name={nameobject} id='nameobject' {...params} size='small'  placeholder='Hà Nội'  required
      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>}
    />
  )
}

export default Combobox
