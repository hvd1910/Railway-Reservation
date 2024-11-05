import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectInput from "../InputLayout/SelectInput";
import InputView from "../InputLayout/InputView";
import { API_BASE_URL } from "../../../config/apiConfig";
import { ToastSuccess , ToastError } from "../ToastNotification/Toast"
import moment from 'moment'



const ScheduleFormRead = ({idObject, handleCancel}) => {
  const navigate = useNavigate();
  const jwtGetData = localStorage.getItem("jwt");

  
  const [userData, setUserData] = useState('');



  useEffect(()=>{
  
      const CheckSchedule = async () => {
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
      CheckSchedule();
      
  }, [idObject])



  return (
    <div className="flex flex-col w-full">
      <Card className="h-[620px] w-full max-w-[100%]">
        <Card className="h-[50px] w-full max-w-[100%]  ">
          <CardContent>
            <div className="float-left ">
              <h2 className="font-semibold lg:text-xl leading-normal">
                View Schedule
              </h2>
            </div>
          </CardContent>
        </Card>
        <CardContent className="flex justify-center">
          <Grid item xs={12}>
           {userData !== '' && <form className="mt-2">
              <div className="grid gap-6 mb-2 md:grid-cols-2">
              <InputView name={"id"} label={"Id"} value={userData.id} type={"number"} />
            <InputView name={"codeSchedule"} label={"Code Schedule"} value={userData.codeSchedule} type={"text"}  />
              </div>
              <div className="grid gap-6 mb-2 md:grid-cols-2">
              <InputView name={"route_from"} label={"Route From"} value={userData.route_from} type={"text"} />
            <InputView name={"route_to"} label={"Route To"} value={userData.route_to} type={"text"}  />
              </div>
              <div className="grid gap-6 mb-2 md:grid-cols-2">
              <InputView name={"dateSchedule"} label={"Date"} value={userData.dateSchedule} type={"text"} />
            <InputView name={"timeSchedule"} label={"Time"} value={userData.timeSchedule} type={"text"}  />
              </div>
              <div className="grid gap-6 mb-2 md:grid-cols-2">
              <InputView name={"trainId"} label={"Train Id"} value={userData.trainId} type={"text"} />
            <InputView name={"distance"} label={"Distance"} value={userData.distance} type={"text"}  />
              </div>
              <div className="grid gap-6 mb-2 md:grid-cols-2">
              <InputView name={"dateUpdated"} label={"Date Update"} value={userData.dateUpdated} type={"text"}  />
              <InputView name={"dateCreated"} label={"Date Create"} value={userData.dateCreated} type={"text"}  />
              </div>
              <div className="grid gap-6 mb-8 md:grid-cols-1">
              <InputView name={"delete_flag"} label={"Delete Flag"} value={userData.delete_flag} type={"text"}  />
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

export default ScheduleFormRead;
