import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../config/apiConfig";
import { ToastSuccess, ToastError } from "../ToastNotification/Toast";
import Combobox from "./Combobox";
import InputTrain from "./InputTrain"
import TimeInputUpdate from "./TimeInputUpdate";
import DateInputUpdate from "./DateInputUpdate";
import { convertDateFormat } from "./convertDate"
import Input from "../InputLayout/Input";
import SelectInput from "../InputLayout/SelectInput";


const ScheduleFormUpdate = ({idObject, handleCancel}) => {
  const jwtGetData = localStorage.getItem("jwt");


  const [userData, setUserData] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();


    const data = new FormData(event.currentTarget);
   
    const Data = {
      route_from: data.get("route_from"),
      route_to: data.get("route_to"),
      dateSchedule: data.get("dateSchedule"),
      timeSchedule: data.get("timeSchedule"),
      trainName: data.get("trainName"), 
      codeSchedule: data.get("trainName") + data.get("dateSchedule").replace(/-/g, "") +  data.get("timeSchedule").replace(":", ""),
      distance: data.get("distance"),
      delete_flag: data.get("delete_flag") === "true",

    };


    
    try{
      const updateTrain = async () => {
        try {
          const res = await axios.put(
            `${API_BASE_URL}/api/Schedules/` + idObject,
            Data,
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
          ToastError({ status: "errror",
          message: "Train schedules already exist." });
        }
      };
      updateTrain();
    }
     catch {
      ToastError({ status: "errror"})
     
     }


  }


  useEffect(()=>{
  
    const GetSchedule = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/Schedules/` + idObject,
          {
            headers: {
              Authorization: `bearer ` + jwtGetData,
            },
          }
        );
        if (res.data.status === "error") {
          ToastError(res.data);
          setTimeout(() => {
            navigate("/admin/schedule")
          }, 1500);
        }else {
          setUserData(res.data)
       
        }
      }catch{
        ToastError("error");
          setTimeout(() => {
            navigate("/admin/schedule")
        }, 1500);
      }
    }
    GetSchedule();
    
}, [idObject])
   

   
  
   

  return (
    <div className="flex flex-col w-full">
      <Card className="h-[470px] w-full max-w-[100%]">
        <Card className="h-[50px] w-full max-w-[100%]  ">
          <CardContent>
            <div className="float-left ">
              <h2 className="font-semibold lg:text-xl leading-normal">
                Update Schedule
              </h2>
            </div>
          </CardContent>
        </Card>
        <CardContent className="flex justify-center">
          <Grid item xs={12}>
            {userData !== '' &&<form className="mt-1" onSubmit={handleSubmit}>
              <div className="grid gap-6 mb-2 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="route_from"
                    className="float-left  block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Route From
                  </label>
                  <Combobox nameobject={"route_from"}  initialValue={userData.route_from}/>
                </div>

                <div>
                  <label
                    htmlFor="route_to"
                    className="float-left  block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Route To
                  </label>
                  <Combobox nameobject={"route_to"} initialValue={userData.route_to} />
                </div>
              </div>
              <div className="grid gap-6 mb-2 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="dateSchedule"
                    className="float-left  block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date
                  </label>
                    <DateInputUpdate initialValue={convertDateFormat(userData.dateSchedule)}/>
                </div>

              
                <div>
                  <label
                    htmlFor="timeSchedule"
                    className="float-left  block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Time
                  </label>
                    <TimeInputUpdate initialValue={userData.timeSchedule}/>
                </div>
              </div>
              <div className="grid gap-6 mb-2 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="trainName"
                    className="float-left  block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Train ID
                  </label>
                  <InputTrain nameobject={"trainName"} initialValue={{trainName: userData.trainId}}/>
                </div>

                <Input name={"distance"} label={"Distance"} value={userData.distance} type={"text"} />

               
              </div>

              <div className="grid gap-6 mb-8 md:grid-cols-1">
                <SelectInput deleteValue={userData.delete_flag}/>
              </div>

              <div className="flex justify-around pl-24 pr-24">
                <Button
                  onClick={handleCancel}
                  variant="contained"
                  size="small"
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
                <Button
                  type="submit"
                  variant="contained"
                  className="mt-6"
                  size="small"
                >
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

export default ScheduleFormUpdate;
