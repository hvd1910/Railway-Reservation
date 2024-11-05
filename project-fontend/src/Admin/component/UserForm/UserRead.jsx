import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectInput from "../InputLayout/SelectInput";
import InputView from "../InputLayout/InputView";
import { API_BASE_URL } from "../../../config/apiConfig";
import { ToastSuccess , ToastError } from "../ToastNotification/Toast"



const UserRead = ({idObject, handleCancel}) => {
  const navigate = useNavigate();
  const jwtGetData = localStorage.getItem("jwt")

  const [userData, setUserData] = useState('');



  useEffect(()=>{
  
      const Check = async () => {
        try {
          const res = await axios.get(
            `${API_BASE_URL}/api/Users/` + idObject, 
            {
              headers: {
                Authorization: `bearer ` + jwtGetData,
              },
            }
          );
          if (res.data.status === "error") {
            ToastError(res.data);
            setTimeout(() => {
              navigate("/admin/user")
            }, 1500);
          }else {
            setUserData(res.data)
         
          }
        }catch{
          ToastError("error");
            setTimeout(() => {
              navigate("/admin/user")
          }, 1500);
        }
      }
      Check();
      
  }, [idObject])



  return (
    <div className="flex flex-col w-full">
      <Card className="h-[400px] w-full max-w-[100%]">
        <Card className="h-[50px] w-full max-w-[100%]  ">
          <CardContent>
            <div className="float-left ">
              <h2 className="font-semibold lg:text-xl leading-normal">
                View User
              </h2>
            </div>
          </CardContent>
        </Card>
        <CardContent className="flex justify-center">
          <Grid item xs={12}>
           {userData !== '' && <form className="mt-2">
           <div className="grid gap-6 mb-2 md:grid-cols-1">
              <InputView name={"id"} label={"Id"} value={userData.id} type={"number"}  />
              </div>
              <div className="grid gap-6 mb-2 md:grid-cols-2">
            <InputView name={"fullName"} label={"FullName"} value={userData.fullName} type={"text"}  />
            <InputView name={"email"} label={"Email"} value={userData.email} type={"email"}  />
              </div>

             <div className="grid gap-6 mb-8 md:grid-cols-2">
              <InputView name={"phone"} label={"Phone"} value={userData.phone} type={"text"}  />
              <InputView name={"role"} label={"Role"} value={userData.role} type={"text"}  />
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

export default UserRead;
