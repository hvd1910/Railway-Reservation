import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { API_BASE_URL } from "../../../config/apiConfig";
import { ToastSuccess, ToastError } from "../ToastNotification/Toast";
import InputView from "../InputLayout/InputView";

const PaymentUpdate = ({ idObject, handleCancel }) => {
  const navigate = useNavigate();
  const jwtGetData = localStorage.getItem("jwt")


  const [userData, setUserData] = useState("");

  const handleRejected = (id) => {
    const Data = {
      status: "Rejected",
    };
    try {
      const update = async () => {
        try {
          const res = await axios.put(
            `${API_BASE_URL}/api/PaymentDetails/status/` + idObject,
            Data,
            {
              headers: {
                Authorization: `bearer ` + jwtGetData,
              },
            }
          );
          if (res.data.error === "error") {
            ToastError(res.data);
          } else {
            ToastSuccess("Update");
            handleCancel();
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        } catch {
          ToastError({ status: "errror" });
        }
      };
      update();
    } catch {
      ToastError({ status: "errror" });
    }
  };

  const handleCompensated = (id) => {
    const Data = {
      status: "Compensated",
    };
    try {
      const update = async () => {
        try {
          const res = await axios.put(
            `${API_BASE_URL}/api/PaymentDetails/status/` + idObject,
            Data,
            {
              headers: {
                Authorization: `bearer ` + jwtGetData,
              },
            }
          );
          if (res.data.error === "error") {
            ToastError(res.data);
          } else {
            ToastSuccess("Update");
            handleCancel();
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        } catch {
          ToastError({ status: "errror" });
        }
      };
      update();
    } catch {
      ToastError({ status: "errror" });
    }
  };
  const handleSuccess = (id) => {
    const Data = {
      status: "Approved",
    };
    try {
      const update = async () => {
        try {
          const res = await axios.put(
            `${API_BASE_URL}/api/PaymentDetails/status/` + idObject,
            Data,
            {
              headers: {
                Authorization: `bearer ` + jwtGetData,
              },
            }
          );
          if (res.data.error === "error") {
            ToastError(res.data);
          } else {
            ToastSuccess("Update");
            handleCancel();
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        } catch {
          ToastError({ status: "errror" });
        }
      };
      update();
    } catch {
      ToastError({ status: "errror" });
    }
  };

  useEffect(() => {
    const Check = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/PaymentDetails/` + idObject,
        {
          headers: {
            Authorization: `bearer ` + jwtGetData,
          },
        }
        );
        if (res.data.status === "error") {
          ToastError(res.data);
          setTimeout(() => {
            navigate("/admin/payment");
          }, 1500);
        } else {
          setUserData(res.data);
        }
      } catch {
        ToastError("error");
        setTimeout(() => {
          navigate("/admin/payment");
        }, 1500);
      }
    };
    Check();
  }, [idObject]);

  return (
    <div className="flex flex-col w-full">
      <Card className="h-[380px] w-full max-w-[100%]">
        <Card className="h-[50px] w-full max-w-[100%]  ">
          <CardContent>
            <div className="float-left ">
              <h2 className="font-semibold lg:text-xl leading-normal">
                Update Payment
              </h2>
            </div>
          </CardContent>
        </Card>
        <CardContent className="flex justify-center">
          <Grid item xs={12}>
            {userData !== "" && (
              <div>
                <div className="grid gap-6 mb-1 md:grid-cols-2">
                  <InputView
                    name={"ticketId"}
                    label={"Ticket Id"}
                    value={userData.ticketId}
                    type={"text"}
                  />
                  <InputView
                    name={"total"}
                    label={"Total (VNĐ)"}
                    value={userData.total}
                    type={"text"}
                  />
                </div>

                <div className="grid gap-6 mb-1 md:grid-cols-2">
                  <InputView
                    name={"payment_method"}
                    label={"Payment Method"}
                    value={userData.payment_method}
                    type={"text"}
                  />
                  <InputView
                    name={"transaction_number"}
                    label={"Transaction Number"}
                    value={userData.transaction_number}
                    type={"text"}
                  />
                </div>
                <div className="grid gap-6 mb-8 md:grid-cols-1">
                  <InputView
                    name={"status"}
                    label={"Status"}
                    value={userData.status}
                    type={"text"}
                  />
                </div>
                {userData.status !== "Pending" && userData.status !== "Refund" && (
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
                  </div>
                )}

                 {userData.status === "Refund" && (
                  
                  <div className="flex justify-around pl-24 pr-24">
                    <Button
                      className=""
                      variant="contained"
                      style={{
                        padding: "10px 10px 5px",
                        fontSize: "10px",
                        backgroundColor: "#4ade80", // Purple-400 background color
                        border: "1px solid #16a34a",
                        fontWeight: "bold",
                      }}
                      onClick={() => {
                        handleCompensated();
                      }}
                    >
                      Compensated
                    </Button>
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
                  </div>
                )}

                {userData.status === "Pending" && (
                  <div className="flex justify-around pl-24 pr-24">
                    <Button
                      className=""
                      variant="contained"
                      style={{
                        padding: "10px 10px 5px",
                        fontSize: "10px",
                        backgroundColor: "#4ade80", // Purple-400 background color
                        border: "1px solid #16a34a",
                        fontWeight: "bold",
                      }}
                      onClick={() => {
                        handleSuccess();
                      }}
                    >
                      Success
                    </Button>
                    <Button
                      className="  "
                      variant="contained"
                      style={{
                        padding: "10px 10px 5px",
                        fontSize: "10px",
                        backgroundColor: "#f43f5e", // Purple-400 background color
                        border: "1px solid #b91c1c",
                        fontWeight: "bold",
                      }}
                      onClick={() => {
                        handleRejected();
                      }}
                    >
                      Rejected
                    </Button>
                  </div>
                )}

                
              </div>
            )}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentUpdate;
