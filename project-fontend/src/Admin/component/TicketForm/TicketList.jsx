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
import ReadTicket from "../../../pages/Admin/Ticket/ReadTicket";
import { ToastSuccess , ToastError } from "../ToastNotification/Toast"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import UpdateTicket from "../../../pages/Admin/Ticket/UpdateTicket";
import { convertDateFormat, convertDateString } from "../ScheduleForm/convertDate";
import ComboxStation from "./ComboxStation";
import StatusSelected from "./StatusSelected";


const TicketList = () => {
  const columns = [
    { id: "id", name: "Id" },
    { id: "fullName", name: "FullName" },
    { id: "codeTicket", name: "Code Ticket" },
    { id: "route_from", name: "Route From" },
    { id: "route_to", name: "Route To" },
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
        const res = await axios.get(`${API_BASE_URL}/api/Tickets`, {
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

const handleValue = (e) =>{
  setSearch(e)
}
const handleStatus = (e)=> {
  setStatusValue(e)
}

 
  
  return (
    <div className="flex flex-col w-full">
      <Card className="h-[520px] w-full max-w-[100%] ">
        <Card className="h-[50px] w-full max-w-[100%]  ">
          <div className="flex justify-between h-full">
            <div className="w-[200px] h-full flex items-center ml-5">
              <h2 className="font-semibold lg:text-xl">Manager Ticket</h2>
            </div>
            <div className="flex justify-between  w-[650px] mr-8 items-center">
              <form action="" className="container flex">
                

                <div className="h-[px] mr-3">
                <ComboxStation nameobject={"route_from"} onChange={(e)=> setSearch(e.target.value)} handleValue={handleValue} />
                </div>
                
                <input className="mr-3"
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
                />
                <div className="h-[px] ">
                <StatusSelected handleValue={handleStatus}/>
                </div>
              </form>
              <Button
                disabled
                onClick={handleAddOpen}
                variant="contained"
                size="small"
                className="w-[240px] "
                sx={{ background: "#6d28d9" }}
              >
                Add Ticket{" "}
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
                          return search === "" && statusValue === "" && date ===""
                            ? item
                            : (search !== "" && date === "" && statusValue === "") ? (item.route_from.includes(search))
                            : (search === "" && date !== "" && statusValue === "") ? ( item.dateCreated.slice(0,10) === date)
                            : (search === "" && date === "" && statusValue !== "") ? ( item.status === statusValue)
                            : date === "" ? (item.route_from.includes(search) && item.status === statusValue)
                            : statusValue === "" ? (item.route_from.includes(search) && item.dateCreated.slice(0,10) === date)
                            : ( item.route_from.includes(search) && item.dateCreated.slice(0,10) === date && item.status === statusValue)
                            
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
                                         
                                          </span>
                                      ) : value === "Pending" ? (
                                        <span className="inline-block bg-orange-100 text-orange-400 px-4 py-0 rounded-full ring-2 ring-orange-400">
                                          Pending
                                        </span>
                                      ) : value === "Booked" ? (
                                        <span className="inline-block bg-emerald-100 text-emerald-400 px-4 py-0 rounded-full ring-2 ring-emerald-400">
                                          Booked
                                        </span>
                                      ) : value === "Rejected" ? (
                                        <span className="inline-block bg-red-100 text-red-400 px-4 py-0 rounded-full ring-2 ring-red-400">
                                          Rejected
                                        </span>
                                      ) : (
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
        <ReadTicket
          open={openReadModal}
          handleClose={handleReadClose}
          id={idObject}
        />
      )}


    </div>
  );
};

export default TicketList;
