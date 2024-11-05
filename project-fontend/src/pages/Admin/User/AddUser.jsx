import { Box, Modal } from '@mui/material'
import React from 'react'
import UserCreate from '../../../Admin/component/UserForm/UserCreate';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "30vw",
  outline: 'none',
  
} ;

const AddUser = ({handleClose, open}) => {

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
        <UserCreate handleCancel={handleCancelClick}/>
      </Box>
    </Modal>

  </div>
  )
}

export default AddUser
