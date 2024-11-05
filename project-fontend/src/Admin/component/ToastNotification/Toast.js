import { toast } from "react-toastify";

export const ToastSuccess = (data) => {
    toast.success(data + " Success."  , {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

 export const ToastError = (data) => {
    toast.error( data.message? data.message : "Error, please try again." , {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };