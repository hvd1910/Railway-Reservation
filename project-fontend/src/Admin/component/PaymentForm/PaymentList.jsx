import {
    Button,
    Card,
    CardContent,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
  import HighlightOffIcon from "@mui/icons-material/HighlightOff";
  import { red } from "@mui/material/colors";
  import axios from "axios";
  import { API_BASE_URL } from "../../../config/apiConfig";
  import { ToastSuccess , ToastError } from "../ToastNotification/Toast"
  import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
  import BorderColorIcon from '@mui/icons-material/BorderColor';
import ReadPayment from "../../../pages/Admin/Payment/ReadPayment";
import UpdatePayment from "../../../pages/Admin/Payment/UpdatePayment";
import {  convertDateFormat, convertDateString } from "../ScheduleForm/convertDate";
import StatusFind from "./StatusFind";

  
  
  const PaymentList = () => {
    const columns = [
      { id: "id", name: "Id" },
      { id: "ticketId", name: "Ticket Id" },
      { id: "total", name: "Total" },
      { id: "payment_method", name: "Payment Method" },
      { id: "transaction_number", name: "Transaction Number" },
      { id: "status", name: "Status" },
      { id: "action", name: "Action" },
    ];
  
    const jwtGetData = localStorage.getItem("jwt");
    const [rows, rowchange] = useState([]);
    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(5);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openReadModal, setOpenReadModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
  
  
    const [idObject, setIdObject] = useState("");
    const [search, setSearch] = useState("");
    const [date, setDate] = useState("");
    const [statusValue, setStatusValue] = useState ('')


  
    useEffect(() => {
      const fetchPost = async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/api/PaymentDetails`, {
            headers: {
              Authorization: `bearer ` + jwtGetData,
            },
          });
          if (res.data.status === "error") {
          } else {
            rowchange(res.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchPost();
    }, []);
  
    const handlechangepage = (event, newpage) => {
      pagechange(newpage);
    };
    const handleRowsPerPage = (event) => {
      rowperpagechange(+event.target.value);
      pagechange(0);
    };
  
    const handleAddOpen = () => {
      setOpenAddModal(true);
    };
  
  
    const handleReadOpen = () => {
      setOpenReadModal(true);
    };
  
    const handleReadClose = () => {
      setOpenReadModal(false);
    };
  
    const handleUpdateOpen = () => {
      setOpenUpdateModal(true);
    };
  
    const handleUpdateClose = () => {
      setOpenUpdateModal(false);
    };
    const handleStatus = (e)=> {
      setStatusValue(e)
    }
  

  
    
    return (
      <div className="flex flex-col w-full">
        <Card className="h-[520px] w-full max-w-[100%] ">
          <Card className="h-[50px] w-full max-w-[100%]  ">
            <div className="flex justify-between h-full">
              <div className="w-[200px] h-full flex items-center ml-5">
                <h2 className="font-semibold lg:text-xl">Manager Payment</h2>
              </div>
              <div className="flex justify-between  w-[440px] mr-8 items-center">
                <form action="" className="container flex">
                
                

                  <input
                  onChange={(e) => setDate(convertDateString(e.target.value))}
                  label="Input Success"
                  type="date"
                  name=""
                  style={{
                    border: "1px solid #333",
                    padding: "1px 8px",
                    borderRadius: "3px",
                    background: "#E8E8E8",
                    color: "000",
                  }}
                  placeholder="Search fullname"
                  className="mr-3"
                />
                 
                <StatusFind handleValue={handleStatus} className=""/>
               
                </form>
                <Button
                  disabled
                  onClick={handleAddOpen}
                  variant="contained"
                  size="small"
                  className="w-[240px] "
                  sx={{ background: "#6d28d9" }}
                >
                  Add Payment{" "}
                </Button>
              </div>
            </div>
          </Card>
          <CardContent className="flex justify-center w-full ">
            <div style={{ textAlign: "center" }} className="w-full">
              <Paper sx={{ width: "100%" }}>
                <TableContainer sx={{ maxHeight: 450 }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {columns.map((column, index) => (
                          <TableCell
                            style={{
                              backgroundColor: "#6d28d9",
                              color: "white",
                              maxWidth:
                                index === columns.length - 1 ? 50 : "none",
                            }}
                            key={column.id}
                          >
                            {column.name}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows &&
                        rows
                          .filter((item) => {
                            return  statusValue === "" && date === ""
                            ? item
                            : statusValue === "" ? ( item.dateCreated.slice(0,10) === date)
                            : date === "" ? ( item.status === statusValue)
                            : ( item.dateCreated.slice(0,10) === date && item.status === statusValue)
                        
                          })
                          .slice(
                            page * rowperpage,
                            page * rowperpage + rowperpage
                          )
                          .map((row, i) => {
                            let id = row.id;
                            return (
                              <TableRow key={row.id}>
                                {columns &&
                                  columns.map((column, i) => {
                                    let value = row[column.id];
  
                                    return (
                                      <TableCell
                                        key={column.id}
                                        className="w-[12%]"
                                      >
                                        {value === true ? (
                                          <CheckCircleOutlineIcon
                                            color="primary"
                                            className="pl-1"
                                          />
                                        ) : value === false ? (
                                          <HighlightOffIcon
                                            sx={{ color: red[500] }}
                                            className="pl-1"
                                          />
                                        ) : value === undefined ? (
                                          <span className=" w-[60px] flex justify-between">
                                            <RemoveRedEyeIcon  onClick={() => {
                                                                setIdObject(id)
                                                                handleReadOpen();
                                                                
                                                                }}
                                            className="block" fontSize="small" sx={{ fontSize: 28, color:'blue',padding: '3px',   '&:hover': { color: '#333' } }} />
                                            <BorderColorIcon onClick={()=>{
                                                    setIdObject(id)
                                                     handleUpdateOpen()
                      
                                            }} className="block" fontSize="small" sx={{ fontSize: 28, color:'#ffc107', padding: '3px', '&:hover': { color: '#333' }}}   />
  
                                            </span>
                                        ) : value === "Pending" ? (
                                          <span className="inline-block bg-orange-100 text-orange-400 px-4 py-0 rounded-full ring-2 ring-orange-400">
                                            Pending
                                          </span>
                                        ) : value === "Approved" ? (
                                          <span className="inline-block bg-emerald-100 text-emerald-400 px-4 py-0 rounded-full ring-2 ring-emerald-400">
                                            Approved
                                          </span>
                                        ) : value === "Rejected" ? (
                                          <span className="inline-block bg-red-100 text-red-400 px-4 py-0 rounded-full ring-2 ring-red-400">
                                            Rejected
                                          </span>
                                        ): value === "Refund" ? (
                                          <span className="inline-block bg-yellow-100 text-yellow-300 px-4 py-0 rounded-full ring-2 ring-yellow-300">
                                            Refund
                                          </span>
                                        ): value === "Compensated" ? (
                                          <span className="inline-block bg-sky-100 text-sky-300 px-4 py-0 rounded-full ring-2 ring-sky-300">
                                            Compensated
                                          </span>
                                        ) : 
                                        (
                                          value
                                        )}
                                      </TableCell>
                                    );
                                  })}
                              </TableRow>
                            );
                          })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5]}
                  rowsPerPage={rowperpage}
                  page={page}
                  count={rows.length}
                  component="div"
                  onPageChange={handlechangepage}
                  onRowsPerPageChange={handleRowsPerPage}
                ></TablePagination>
              </Paper>
            </div>
          </CardContent>
        </Card>
  
      
  
        {openReadModal && (
          <ReadPayment
            open={openReadModal}
            handleClose={handleReadClose}
            id={idObject}
          />
        )}
  
  {openUpdateModal   &&  <UpdatePayment  open={openUpdateModal} handleClose={handleUpdateClose} id={idObject}/>}
  
      </div>
    );
  };
  
  export default PaymentList;
  