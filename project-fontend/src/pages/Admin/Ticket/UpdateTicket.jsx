import { Box, Modal } from '@mui/material'
import TicketUpdate from '../../../Admin/component/TicketForm/TicketUpdate';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "30vw",
  outline: 'none',
  
} ;



const UpdateTicket = ({handleClose, open, id}) => {

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
        {id !== '' && <TicketUpdate idObject={id} handleCancel={handleCancelClick}/>}
      </Box>
    </Modal>

  </div>
  )
}

export default UpdateTicket
