import React, { useEffect, useState } from 'react'
import Capin from './Capin';
import {API_BASE_URL} from '../../../config/apiConfig'
import axios from 'axios';

const CapinPicker = ({onSelect, idTrain}) => {
  const [data, setData] = useState({ac1: 0, ac2: 0, ac3: 0})
 
  
  useEffect(()=> {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/Trains/${idTrain}`);
        
        if(res.data.status !== "error") {
          setData(res.data)
        }
        
      } catch {
      }
    };

    if(idTrain != null) {
      fetchPost();
    }
  }, [idTrain])

  
  const combinedArray = Array.from({ length: data.ac1 + data.ac2 + data.ac3 }, (_, index) => {
    const compartmentIndex = index + 1;
    
    if (compartmentIndex <= data.ac1) {
      return `ac1${compartmentIndex}`;
    } else if (compartmentIndex <= data.ac1 + data.ac2) {
      const ac2Index = compartmentIndex - data.ac1;
      return `ac2${ac2Index}`;
    } else {
      const ac3Index = compartmentIndex - data.ac1 - data.ac2;
      return `ac3${ac3Index}`;
    }
  });

    
      const handleCompartmentSelect = (selectedCompartment) => {
        onSelect(selectedCompartment)
        };
    
      return (
        <div className='w-[100%] mt-6'>
          <h1 className='mb-4 font-semibold text-gray-800 text-xl pl-0'>Train compartment</h1>
          <Capin
            compartments={combinedArray}
            onSelect={handleCompartmentSelect}
          />
        </div>
      );
}

export default CapinPicker
