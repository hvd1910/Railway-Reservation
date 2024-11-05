import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../config/apiConfig";
import { ToastSuccess, ToastError } from "../ToastNotification/Toast";
import Combobox from "./Combobox";
import InputTrain from "./InputTrain"



const ScheduleFormCreate = ({ handleCancel }) => {
  const jwtGetData = localStorage.getItem("jwt");

  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split("T")[0];

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
      distance: data.get("distance")
    };

    
    event.target.reset();


    const postStation = async () => {
      try {
        const res = await axios.post(`${API_BASE_URL}/api/Schedules`, Data,
        {
          headers: {
            Authorization: `bearer ` + jwtGetData,
          },
        }
        );
        if (res.data.error === "error") {
          ToastError(res.data);
        } else {
          ToastSuccess("Add Schedule");
          handleCancel();
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      } catch {
        ToastError({ status: "errror",
        message: "Train schedules already exist."
       });
      }
    };
    postStation();
  };

  return (
    <div className="flex flex-col w-full">
      <Card className="h-[400px] w-full max-w-[100%]">
        <Card className="h-[50px] w-full max-w-[100%]  ">
          <CardContent>
            <div className="float-left ">
              <h2 className="font-semibold lg:text-xl leading-normal">
                Add Schedule
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
                    htmlFor="route_from"
                    className="float-left  block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Route From
                  </label>
                  <Combobox nameobject={"route_from"} />
                </div>

                <div>
                  <label
                    htmlFor="route_to"
                    className="float-left  block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Route To
                  </label>
                  <Combobox nameobject={"route_to"} />
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
                  <div className="relative max-w-sm h-[40px]">
                    <div className="absolute inset-y-[50px] start-0 flex items-center ps-3.5 pointer-events-none ">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    </div>
                    <input
                      type="date"
                      id="dateSchedule"
                      name="dateSchedule"
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select date"
                      min={currentDateString} // Giới hạn chọn từ ngày hiện tại trở đi
                    />
                  </div>
                </div>

              
                <div>
                  <label
                    htmlFor="timeSchedule"
                    className="float-left  block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Time
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      id="timeSchedule"
                      name="timeSchedule"
                      max="23:59"
                      required
                    />
                    <label
                      htmlFor="timeSchedule"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    ></label>
                  </div>
                </div>
              </div>
              <div className="grid gap-6 mb-10 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="trainName"
                    className="float-left  block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Train Name
                  </label>
                  <InputTrain nameobject={"trainName"}/>
                </div>

                <div>
                  <label
                    htmlFor="distance"
                    className="float-left  block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Distance
                  </label>
                  <input
                    type="number"
                    id="distance"
                    name="distance"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="10"
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
                <Button
                  type="submit"
                  variant="contained"
                  className="mt-6"
                  size="small"
                >
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

export default ScheduleFormCreate;
