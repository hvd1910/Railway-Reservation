import { Box, Modal } from '@mui/material'
import UpdateFormTrain from '../../../Admin/component/FormTrain/UpdateFormTrain'

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "30vw",
  outline: 'none',
  
} ;



const UpdateTrain = ({handleClose, open, id}) => {

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
        {id !== '' && <UpdateFormTrain idObject={id} handleCancel={handleCancelClick}/>}
      </Box>
    </Modal>

  </div>
  )
}

export default UpdateTrain
