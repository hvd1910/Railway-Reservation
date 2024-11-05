import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../config/apiConfig";
import { ToastSuccess , ToastError } from "../ToastNotification/Toast"
import Input from "../InputLayout/Input";


const TicketPriceCreate = ({handleCancel}) => {  
  const jwtGetData = localStorage.getItem("jwt")

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const Data = {
      ticketName: data.get("ticketName"),
      price: data.get("price"),

    };
    
    event.target.reset();

            const add = async () => {
              try {
                const res = await axios.post(
                  `${API_BASE_URL}/api/TicketPrices`,
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
                  ToastSuccess("Add Ticket Price");
                  handleCancel()
                  setTimeout(()=> {
                    window.location.reload();
                  },3000)
                  
                }
              } catch {
                ToastError({ status: "errror" });
              }
            };
            add();
   
  };

  return (
    <div className="flex flex-col w-full">
      <Card className="h-[230px] w-full max-w-[100%]">
        <Card className="h-[50px] w-full max-w-[100%]  ">
          <CardContent>
            <div className="float-left ">
              <h2 className="font-semibold lg:text-xl leading-normal">
                Add Ticket Price
              </h2>
            </div>
          </CardContent>
        </Card>
        <CardContent className="flex justify-center">
          <Grid item xs={12}>
            <form className="mt-1" onSubmit={handleSubmit}>
              <div className="grid gap-6 mb-8 md:grid-cols-2">
              <div className="">
                  <label
                    htmlFor="ticketName"
                    className="float-left block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                  >
                    Ticket Name
                  </label>
                  <TextField  size='small' type="text"  id="ticketName"   name="ticketName" placeholder="AC1"  required
                    
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="Price"
                    className="float-left block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                  >
                    Price
                  </label>
                  <TextField  size='small' type="number"  id="price"   name="price" placeholder="6800"  required
                    
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

export default TicketPriceCreate;
