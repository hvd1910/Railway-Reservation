import { Box, Modal } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from "../../../config/apiConfig"
import { ToastSuccess , ToastError } from "../ToastNotification/Toast"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    outline: 'none',
    
} ;





const DeleteLayout = ({handleClose, open,idObject, objectLink}) => {
  const jwtGetData = localStorage.getItem("jwt")

    const id =idObject;
    const handleCancelClick = () => {
        handleClose()
      };

    const handleDelete=() => {
        const fetchPost = async () => {
            try {
              const res = await axios.delete(
                `${API_BASE_URL}/api/${objectLink}/` + id,
                {
                  headers: {
                    Authorization: `bearer ` + jwtGetData,
                  },
                }
                );
              if(res.data.status ==="error") {
                ToastError(res.data)
                console.log("sss")
              }else {
                ToastSuccess("Delete")
                handleCancelClick();
                setTimeout(() => {
                    window.location.reload();
                  }, 3000);
              }
            } catch (error) {
                ToastError("error");
            }
          };
        
          fetchPost();

    }


  return (
    <div>
      <Modal
        open={open? open : false}
        onClose={handleCancelClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}> 
        
       
        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <button type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                <CloseIcon  onClick={handleCancelClick}/>
                <span className="sr-only">Close modal</span>
            </button>
           <DeleteForeverIcon/>
            <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
            <div className="flex justify-center items-center space-x-4">
                <button  onClick={handleCancelClick} data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                    No, cancel</button>
                <button onClick={ handleDelete}
                type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                    Yes, I'm sure</button>
            </div>
        </div>

        </Box>
      </Modal>

    </div>
  )
}

export default DeleteLayout
