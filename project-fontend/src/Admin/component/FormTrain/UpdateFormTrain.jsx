import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SelectInput from "../InputLayout/SelectInput";
import Input from "../InputLayout/Input";
import { API_BASE_URL } from "../../../config/apiConfig";
import { ToastSuccess , ToastError } from "../ToastNotification/Toast"



const UpdateFormTrain = ({idObject, handleCancel}) => {
  const navigate = useNavigate();
  const jwtGetData = localStorage.getItem("jwt")

  const [userData, setUserData] = useState('');
  const [deleteValue, setDeleteValue] = useState('')

   
 

  

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
   
    const trainData = {
      trainName: data.get("trainName"),
      ac1: data.get("ac1"),
      ac2: data.get("ac2"),
      ac3: data.get("ac3"),
      delete_flag: data.get("delete_flag") === "true",
    };


    try{
      const updateTrain = async () => {
        try {
          const res = await axios.put(
            `${API_BASE_URL}/api/Trains/` + idObject,
            trainData, 
            {
              headers: {
                Authorization: `bearer ` + jwtGetData,
              },
            }
          );
          if (res.data.status === "error") {
            ToastError(res.data);
          } else {
            ToastSuccess("Update");
            handleCancel()
            setTimeout(()=> {
              window.location.reload();
            },3000)

          }
        } catch {
          ToastError({ status: "errror" });
        }
      };
      updateTrain();
    }
     catch {
      ToastError({ status: "errror" });
     }
    
  }  
 

  useEffect(()=>{
  
      const CheckTrain = async () => {
        try {
          const res = await axios.get(
            `${API_BASE_URL}/api/Trains/` + idObject
          );
          if (res.data.status === "error") {
            ToastError(res.data);
            setTimeout(() => {
              navigate("/admin/train")
            }, 1500);
          }else {
            setUserData(res.data)
            setDeleteValue(res.data.delete_flag)
         
          }
        }catch{
          ToastError("error");
            setTimeout(() => {
              navigate("/admin/train")
          }, 1500);
        }
      }
      CheckTrain();
      
  }, [idObject])



  return (
    <div className="flex flex-col w-full">
      <Card className="h-[440px] w-full max-w-[100%]">
        <Card className="h-[50px] w-full max-w-[100%]  ">
          <CardContent>
            <div className="float-left ">
              <h2 className="font-semibold lg:text-xl leading-normal">
                Update Train
              </h2>
            </div>
          </CardContent>
        </Card>
        <CardContent className="flex justify-center">
          <Grid item xs={12}>
           {userData !== '' && <form className="mt-8" onSubmit={handleSubmit}>
              <div className="grid gap-6 mb-2 md:grid-cols-2">
               
               <Input name={"trainName"} label={"Train Name"} value={userData.trainName} type={"text"} />

               <Input name={"ac1"} label={"AC 1"} value={userData.ac1} type={"number"} />

              </div>

              <div className="grid gap-6 mb-2 md:grid-cols-2">
              <Input name={"ac2"} label={"AC 2"} value={userData.ac2} type={"number"} />

              <Input name={"ac3"} label={"AC 3"} value={userData.ac3} type={"number"} />

                </div>

              <div className="grid gap-6 mb-12 md:grid-cols-1">
                <SelectInput deleteValue={deleteValue}/>
              </div>

              <div className="flex justify-around pl-24 pr-24">
                <Button
                  onClick={handleCancel}
                  variant="contained"
                  className="mt-6"
                  sx={{
                    backgroundColor: "white",
                    color: "#333",
                    "&:hover": {
                      backgroundColor: "#999",
                      color: "white", // Light blue color on hover
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" className="mt-6">
                  Submit
                </Button>
              </div>
            </form>}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateFormTrain;
