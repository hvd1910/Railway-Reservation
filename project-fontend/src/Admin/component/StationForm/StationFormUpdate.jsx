import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectInput from "../InputLayout/SelectInput";
import Input from "../InputLayout/Input";
import { API_BASE_URL } from "../../../config/apiConfig";
import { ToastSuccess , ToastError } from "../ToastNotification/Toast"



const StationFormUpdate = ({idObject, handleCancel}) => {
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState('');

   
 

  

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const Data = {
      stationName: data.get("stationName"),     
    };


    try{
      const updateTrain = async () => {
        try {
          const res = await axios.put(
            `${API_BASE_URL}/api/Stations/` + idObject,
            Data
          );
          if (res.data.error === "error") {
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
  
      const CheckUser = async () => {
        try {
          const res = await axios.get(
            `${API_BASE_URL}/api/Stations/` + idObject
          );
          if (res.data.status === "error") {
            ToastError(res.data);
            setTimeout(() => {
              navigate("/admin/station")
            }, 1500);
          }else {
            setUserData(res.data)
         
          }
        }catch{
          ToastError("error");
            setTimeout(() => {
              navigate("/admin/station")
          }, 1500);
        }
      }
      CheckUser();
      
  }, [idObject])



  return (
    <div className="flex flex-col w-full">
      <Card className="h-[240px] w-full max-w-[100%]">
        <Card className="h-[50px] w-full max-w-[100%]  ">
          <CardContent>
            <div className="float-left ">
              <h2 className="font-semibold lg:text-xl leading-normal">
                Update Station
              </h2>
            </div>
          </CardContent>
        </Card>
        <CardContent className="flex justify-center">
          <Grid item xs={12}>
           {userData !== '' && <form className="mt-2" onSubmit={handleSubmit}>
              <div className="grid gap-6 mb-8 md:grid-cols-1">
               <Input name={"stationName"} label={"Station Name"} value={userData.stationName} type={"text"} />
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

export default StationFormUpdate;
