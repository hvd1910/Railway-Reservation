import { Box, Modal } from '@mui/material'
import PaymentUpdate from '../../../Admin/component/PaymentForm/PaymentUpdate';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "30vw",
  outline: 'none',
  
} ;



const UpdatePayment = ({handleClose, open, id}) => {

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
        {id !== '' && <PaymentUpdate idObject={id} handleCancel={handleCancelClick}/>}
      </Box>
    </Modal>

  </div>
  )
}

export default UpdatePayment
