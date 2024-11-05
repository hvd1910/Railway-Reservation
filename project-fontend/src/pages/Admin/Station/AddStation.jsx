import { Box, Modal } from '@mui/material'
import React from 'react'
import StationFormCreate from '../../../Admin/component/StationForm/StationFormCreate';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "30vw",
  outline: 'none',
  
} ;

const AddStation = ({handleClose, open}) => {

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
        <StationFormCreate handleCancel={handleCancelClick}/>
      </Box>
    </Modal>

  </div>
  )
}

export default AddStation
