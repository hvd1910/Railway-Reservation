import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../config/apiConfig";
import { ToastSuccess , ToastError } from "../ToastNotification/Toast"


const FormTrain = ({handleCancel}) => {
  const [getName, setGetName] = useState(false);
  const jwtGetData = localStorage.getItem("jwt")


  

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const trainData = {
      trainName: data.get("trainName"),
      ac1: data.get("ac1"),
      ac2: data.get("ac2"),
      ac3: data.get("ac3"),
    };
    
    event.target.reset();

    try {
      const CheckEmail = async () => {
        try {
          const res = await axios.get(
            `${API_BASE_URL}/api/Trains/checkName/` + trainData.trainName,
            {
              headers: {
                Authorization: `bearer ` + jwtGetData,
              },
            }
            
          );

          if (res.data.status === "error") {
            setGetName(true);
            ToastError(res.data);
          } else {
            const addTrain = async () => {
              try {
                const res = await axios.post(
                  `${API_BASE_URL}/api/Trains`,
                  trainData, 
                  {
                    headers: {
                      Authorization: `bearer ` + jwtGetData,
                    },
                  }
                );
                if (res.data.error === "error") {
                  ToastError(res.data);
                } else {
                  ToastSuccess("Add Train");
                  handleCancel()
                  setTimeout(()=> {
                    window.location.reload();
                  },3000)
                  
                }
              } catch {
                ToastError({ status: "errror" });
              }
            };
            addTrain();
          }
        } catch {}
      };
      CheckEmail();
    } catch {}
  };

  return (
    <div className="flex flex-col w-full">
      <Card className="h-[300px] w-full max-w-[100%]">
        <Card className="h-[50px] w-full max-w-[100%]  ">
          <CardContent>
            <div className="float-left ">
              <h2 className="font-semibold lg:text-xl leading-normal">
                Add Train
              </h2>
            </div>
          </CardContent>
        </Card>
        <CardContent className="flex justify-center">
          <Grid item xs={12}>
            <form className="mt-1" onSubmit={handleSubmit}>
              <div className="grid gap-6 mb-2 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="trainName"
                    className="float-left  block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Train Name
                  </label>
                  <input
                    type="text"
                    id="trainName"
                    name="trainName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Train Name"
                    required
                  />
                </div>

                <div className="">
                  <label
                    htmlFor="ac1"
                    className="float-left block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                  >
                    AC 1
                  </label>
                  <input
                    type="number"
                    id="ac1"
                    name="ac1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="AC 1"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className="">
                  <label
                    htmlFor="ac2"
                    className="float-left block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                  >
                    AC 2
                  </label>
                  <input
                    type="number"
                    id="ac2"
                    name="ac2"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="AC 2"
                    required
                  />
                </div>

                <div className="">
                  <label
                    htmlFor="ac3"
                    className="float-left block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                  >
                    AC 3
                  </label>
                  <input
                    type="number"
                    id="ac3"
                    name="ac3"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="AC 3"
                    required
                  />
                </div>
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
                <Button type="submit" variant="contained" className="mt-6" size="small">
                  Submit
                </Button>
              </div>
            </form>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormTrain;
