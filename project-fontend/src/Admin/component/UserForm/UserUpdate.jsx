import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectInput from "../InputLayout/SelectInput";
import Input from "../InputLayout/Input";
import { API_BASE_URL } from "../../../config/apiConfig";
import { ToastSuccess , ToastError } from "../ToastNotification/Toast"
import RoleSelect from "./RoleSelect";



const UserUpdate = ({idObject, handleCancel}) => {
  const navigate = useNavigate();
  const jwtGetData = localStorage.getItem("jwt")

  const [userData, setUserData] = useState('');




  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const Data = {
        fullName: data.get("fullName"),    
        email: data.get("email"),     
        phone: data.get("phone"),     
        password: data.get("password"),     
        role: data.get("role"),     
    };


    try{
      const update = async () => {
        try {
          const res = await axios.put(
            `${API_BASE_URL}/api/Users/` + idObject,
            Data, {
              headers: {
                Authorization: `bearer ` + jwtGetData,
              },
            }
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
      update();
    }
     catch {
      ToastError({ status: "errror" });
     }
    
  }  
 

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
                Update User
              </h2>
            </div>
          </CardContent>
        </Card>
        <CardContent className="flex justify-center">
          <Grid item xs={12}>
           {userData !== '' && <form className="mt-2" onSubmit={handleSubmit}>
           <div className="grid gap-6 mb-2 md:grid-cols-1">
               <Input name={"fullName"} label={"FullName"} value={userData.fullName} type={"text"} />
               </div>
              <div className="grid gap-6 mb-2 md:grid-cols-2">
               <Input name={"email"} label={"Email"} value={userData.email} type={"email"} />
               <Input name={"phone"} label={"phone"} value={userData.phone} type={"text"} />
              </div>
              <div className="grid gap-6 mb-8 md:grid-cols-2">
               <Input name={"password"} label={"Password"} value={userData.password} type={"password"} />
               <RoleSelect  value={userData.role}/>
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

export default UserUpdate;
