import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectInput from "../InputLayout/SelectInput";
import InputView from "../InputLayout/InputView";
import { API_BASE_URL } from "../../../config/apiConfig";
import { ToastSuccess , ToastError } from "../ToastNotification/Toast"



const TicketRead = ({idObject, handleCancel}) => {
  const navigate = useNavigate();
  const jwtGetData = localStorage.getItem("jwt");

  const [userData, setUserData] = useState('');


  useEffect(()=>{
  
      const Check = async () => {
        try {
          const res = await axios.get(
            `${API_BASE_URL}/api/Tickets/` + idObject,
            {
              headers: {
                Authorization: `bearer ` + jwtGetData,
              },
            }
          );
          if (res.data.status === "error") {
            ToastError(res.data);
            setTimeout(() => {
              navigate("/admin/ticket")
            }, 1500);
          }else {
            setUserData(res.data)
         
          }
        }catch{
          ToastError("error");
            setTimeout(() => {
              navigate("/admin/ticket")
          }, 1500);
        }
      }
      Check();
      
  }, [idObject])



  return (
    <div className="flex flex-col w-full">
      <Card className="h-[700px] w-full max-w-[100%]">
        <Card className="h-[50px] w-full max-w-[100%]  ">
          <CardContent>
            <div className="float-left ">
              <h2 className="font-semibold lg:text-xl leading-normal">
                View Ticket 
              </h2>
            </div>
          </CardContent>
        </Card>
        <CardContent className="flex justify-center">
          <Grid item xs={12}>
           {userData !== '' && <form className="mt-0">
           <div className="grid gap-6 mb-1 md:grid-cols-1">
              <InputView name={"id"} label={"Id"} value={userData.id} type={"number"}  />
              </div>
              <div className="grid gap-6 mb-1 md:grid-cols-2">
            <InputView name={"fullName"} label={"Full Name"} value={userData.fullName} type={"text"}  />
            <InputView name={"email"} label={"Email"} value={userData.email} type={"text"}  />
              </div>

              <div className="grid gap-6 mb-1 md:grid-cols-2">
            <InputView name={"phone"} label={"Phone"} value={userData.phone} type={"text"}  />
            <InputView name={"codeTicket"} label={"Code Ticket"} value={userData.codeTicket} type={"text"}  />
              </div>
               
              <div className="grid gap-6 mb-1 md:grid-cols-2">
            <InputView name={"route_from"} label={"Route From"} value={userData.route_from} type={"text"}  />
            <InputView name={"route_to"} label={"Route To"} value={userData.route_to} type={"text"}  />
              </div>
               
              <div className="grid gap-6 mb-1 md:grid-cols-2">
            <InputView name={"dateSchedule"} label={"Date"} value={userData.dateSchedule} type={"text"}  />
            <InputView name={"timeSchedule"} label={"Time"} value={userData.timeSchedule} type={"text"}  />
              </div>
                 
              <div className="grid gap-6 mb-1 md:grid-cols-2">
              <InputView name={"scheduleId"} label={"Schedule Id"} value={userData.scheduleId}type={"text"}  />
            <InputView name={"seat_type"} label={"Seat Type"} value={userData.seat_type} type={"text"}  />
              </div>

              <div className="grid gap-6 mb-1 md:grid-cols-2">
              <InputView name={"seat_num"} label={"Seat Num"} value={userData.seat_num} type={"text"}  />
              <InputView name={"status"} label={"Status"} value={userData.status}type={"text"}  />
              </div>


             <div className="grid gap-6 mb-4 md:grid-cols-2">
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

export default TicketRead;
