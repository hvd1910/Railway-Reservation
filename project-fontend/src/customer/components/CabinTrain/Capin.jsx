import React, { useState } from 'react';

const Capin = ({ compartments, onSelect }) => {
    const [selectedCompartment, setSelectedCompartment] = useState('ac11');

    const handleCompartmentClick = (compartment) => {
      setSelectedCompartment(compartment);
      onSelect(compartment);
    };
  
    return (
      <div className='flex flex-wrap justify-center'>
      {compartments.map((compartment, index) => (
        <div className='w-[60px]' key={index}>
          <div
            onClick={() => handleCompartmentClick(compartment)}
            style={{
              borderRadius: '6px',
              margin: '2px',
              cursor: 'pointer',
              backgroundColor:
                compartment === selectedCompartment ? 'red' : 'lightblue',
            }}
          >
            <img className='w-[100%]' src="https://dsvn.vn/images/trainCar2.png" alt="" />
          </div>
          {index+1}
        </div>
      ))}
    </div>
    );
};

export default Capin;