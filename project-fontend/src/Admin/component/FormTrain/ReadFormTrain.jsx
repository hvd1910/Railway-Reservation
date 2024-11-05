import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectInput from "../InputLayout/SelectInput";
import InputView from "../InputLayout/InputView";
import { API_BASE_URL } from "../../../config/apiConfig";
import { ToastSuccess , ToastError } from "../ToastNotification/Toast"



const ReadFormTrain = ({idObject, handleCancel}) => {
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState('');

   
 

  

  
   
 

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
      <Card className="h-[470px] w-full max-w-[100%]">
        <Card className="h-[50px] w-full max-w-[100%]  ">
          <CardContent>
            <div className="float-left ">
              <h2 className="font-semibold lg:text-xl leading-normal">
                View Train
              </h2>
            </div>
          </CardContent>
        </Card>
        <CardContent className="flex justify-center">
          <Grid item xs={12}>
           {userData !== '' && <form className="mt-2">
              <div className="grid gap-6 mb-2 md:grid-cols-2">
              <InputView name={"id"} label={"Id"} value={userData.id} type={"number"}  />
            <InputView name={"trainName"} label={"Train Name"} value={userData.trainName} type={"text"}  />
              </div>
              <div className="grid gap-6 mb-2 md:grid-cols-2">
              <InputView name={"ac1"} label={"AC1"} value={userData.ac1} type={"number"}  />
            <InputView name={"ac2"} label={"AC2"} value={userData.ac2} type={"number"}  />
              </div>
              <div className="grid gap-6 mb-2 md:grid-cols-2">
              <InputView name={"ac3"} label={"AC3"} value={userData.ac3} type={"number"}  />
            <InputView name={"delete_flag"} label={"Delete Flag"} value={userData.delete_flag} type={"text"}  />
              </div>
              <div className="grid gap-6 mb-8 md:grid-cols-2">
              <InputView name={"dateUpdated"} label={"Date Update"} value={userData.dateUpdated}type={"text"}  />
              <InputView name={"dateCreated"} label={"Date Create"} value={userData.dateCreated} type={"text"}  />
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
                <Button disabled type="submit" variant="contained" className="mt-6">
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

export default ReadFormTrain;
