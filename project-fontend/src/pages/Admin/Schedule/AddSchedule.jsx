import { Box, Modal } from '@mui/material'
import React from 'react'
import ScheduleFormCreate from '../../../Admin/component/ScheduleForm/ScheduleFormCreate';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "30vw",
  outline: 'none',
  
} ;

const AddSchedule = ({handleClose, open}) => {

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
        <ScheduleFormCreate handleCancel={handleCancelClick}/>
      </Box>
    </Modal>

  </div>
  )
}

export default AddSchedule
