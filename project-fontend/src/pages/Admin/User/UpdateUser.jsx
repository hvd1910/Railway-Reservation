import { Box, Modal } from '@mui/material'
import UserUpdate from '../../../Admin/component/UserForm/UserUpdate';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "30vw",
  outline: 'none',
  
} ;



const UpdateUser = ({handleClose, open, id}) => {

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
        {id !== '' && <UserUpdate idObject={id} handleCancel={handleCancelClick}/>}
      </Box>
    </Modal>

  </div>
  )
}

export default UpdateUser
