import { Box, Modal } from '@mui/material'
import React from 'react'
import TicketPriceCreate from '../../../Admin/component/TicketPriceForm/TicketPriceCreate';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "30vw",
  outline: 'none',
  
} ;

const AddTicketPrice = ({handleClose, open}) => {

  const handleCancelClick = () => {
    handleClose()
  };

  return (
    <div>
    <Modal
      open={open? open : false}
      onClose={handleCancelClick}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}> 
        <TicketPriceCreate handleCancel={handleCancelClick}/>
      </Box>
    </Modal>

  </div>
  )
}

export default AddTicketPrice
