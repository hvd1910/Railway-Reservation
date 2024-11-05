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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { red } from "@mui/material/colors";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from "axios";
import DeleteLayout from "../DeleteLayout/DeleteLayout";
import AddTrain from "../../../pages/Admin/Train/AddTrain";
import UpdateTrain from "../../../pages/Admin/Train/UpdateTrain";
import { API_BASE_URL } from "../../../config/apiConfig";
import ReadTrain from "../../../pages/Admin/Train/ReadTrain";

const TableListTrain = () => {
  const jwtGetData = localStorage.getItem("jwt")

  const columns = [
    { id: "id", name: "Id" },
    { id: "trainName", name: "TrainName" },
    { id: "ac1", name: "Ac1" },
    { id: "ac2", name: "Ac2" },
    { id: "ac3", name: "Ac3" },
    { id: "delete_flag", name: "Delete flag" },
    { id: "action", name: "Action" },
   
  ];

  

 

  const [rows, rowchange] = useState([]);
  const [page, pagechange] = useState(0);
  const [rowperpage, rowperpagechange] = useState(5);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openReadModal, setOpenReadModal] = useState(false);



  const [idObject, setIdObject] = useState('');
  const [search, setSearch] = useState('');
  

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/Trains` , 
          {
            headers: {
              Authorization: `bearer ` + jwtGetData,
            },
          });
        if(res.data.status ==="error") {

        }else {
          rowchange(res.data)
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

   
  const handleReadOpen = () => {
    setOpenReadModal(true);
  };

  const handleReadClose = () => {
    setOpenReadModal(false);
  };
  
  const handleAddOpen = () => {
    setOpenAddModal(true);
  };

  const handleAddClose = () => {
    setOpenAddModal(false);
  };

  const handleUpdateOpen = () => {
    setOpenUpdateModal(true);
  };

  const handleUpdateClose = () => {
    setOpenUpdateModal(false);
  };

  const handleDeleteOpen = () => {
    setOpenDeleteModal(true);
  };

  const handleDeleteClose = () => {
    setOpenDeleteModal(false);
  };


  return (
    <div className="flex flex-col w-full">
      <Card className="h-[500px] w-full max-w-[100%] ">
        <Card className="h-[50px] w-full max-w-[100%]  ">
          
           <div className="flex justify-between h-full">
           <div className="w-[140px] h-full flex items-center ml-5">
              <h2 className="font-semibold lg:text-xl">
                Manager Train
              </h2>
            </div>
            <div className="flex justify-between  w-[360px] mr-8 items-center"  >
            
              <form action="" className="container ">
              
              <input onChange={(e)=> setSearch(e.target.value)}
              label="Input Success" style={{border: "1px solid #333", padding:"1px 8px", borderRadius:"3px", background:"#E8E8E8", color:"000"}} placeholder="Search train name" />
 
              </form>
              <Button onClick={handleAddOpen} variant="contained" size="small" className="w-[140px] " sx={{background:"#6d28d9"}}>Add Train</Button>
            </div>
           </div>
         
        </Card>
        <CardContent className="flex justify-center w-full ">
          <div style={{ textAlign: "center" }} className="w-full">
            <Paper sx={{ width: "100%" }}>
              <TableContainer sx={{ maxHeight: 450 }}>
                <Table stickyHeader>
                  <TableHead >
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          style={{ backgroundColor: "#6d28d9", color: "white" }}
                          key={column.id}
                        >
                          {column.name}
                        </TableCell>
                      ))}

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows &&
                      rows.filter((item)=>{
                        return search.toLowerCase() === '' ? item : item.trainName.
                        toLowerCase().includes(search)
                      })
                        .slice(
                          page * rowperpage,
                          page * rowperpage + rowperpage
                        )
                        .map((row, i) => {
                            let id = row.id
                          return (
                            <TableRow key={row.id}>
                              {columns &&
                                columns.map((column, i) => {
                                  let value = row[column.id];
                                 
                                  return (
                                    <TableCell key={column.id} className="w-[12%]"> 
                                      {value === true ? (
                                        <CheckCircleOutlineIcon color="primary" className="pl-1" />
                                      ) : value === false ? (
                                        <HighlightOffIcon sx={{ color: red[500] }} className="pl-1" />
                                      ) :  value === undefined ?(
                                        <span className=" w-[100px] flex justify-between">
                                          <RemoveRedEyeIcon  onClick={() => {
                                                              setIdObject(id)
                                                              handleReadOpen();
                                                              
                                                              }}
                                          className="block" fontSize="small" sx={{ fontSize: 28, color:'blue',padding: '3px',   '&:hover': { color: '#333' } }} />
                                          <BorderColorIcon onClick={()=>{
                                                  setIdObject(id)
                                                   handleUpdateOpen()
                    
                                          }} className="block" fontSize="small" sx={{ fontSize: 28, color:'#ffc107', padding: '3px', '&:hover': { color: '#333' }}}   />
                                          <DeleteForeverIcon  onClick={() => {
                                                              setIdObject(id)
                                                              handleDeleteOpen();
                                                              
                                                              }}
                                          className="block" fontSize="small" sx={{ fontSize: 30, color:'red',padding: '3px',   '&:hover': { color: '#333' } }}/>
                                          
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
      {openDeleteModal && <DeleteLayout  open={openDeleteModal} handleClose={handleDeleteClose} idObject={idObject} objectLink={"Trains"}/>}
      
      {openAddModal && <AddTrain  open={openAddModal} handleClose={handleAddClose} />}
      {openUpdateModal   &&  <UpdateTrain  open={openUpdateModal} handleClose={handleUpdateClose} id={idObject}/>}

      {openReadModal   &&  <ReadTrain  open={openReadModal} handleClose={handleReadClose} id={idObject}/>}

      
 
    </div>
    
  );
};

export default TableListTrain;
