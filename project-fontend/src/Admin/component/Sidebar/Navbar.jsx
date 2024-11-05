import { Avatar, Card, Menu, MenuItem } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import axios from "axios";
import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastSuccess, ToastError } from "../ToastNotification/Toast";
import { API_BASE_URL } from "../../../config/apiConfig";





const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState([]);
  const [getData, setGetData] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const emailGet = localStorage.getItem("email");
  const jwtGetData = localStorage.getItem("jwt")

  

  useEffect(() => {
    if (jwtGetData !== null) {
      const fetchPost = async () => {
        try {
          const res = await axios.get(
            `${API_BASE_URL}/api/Users/find/` + emailGet,
            {
              headers: {
                Authorization: `bearer ` + jwtGetData,
              },
            }
          );

          if (res.data.status === "error") {
            ToastError(res.data) 
          }else {
            setUser(res.data)

          }
        } catch {
          localStorage.clear();
          ToastError({status: "error",
                      massage: "Please Sign In again."
                    })  
          navigate('/admin/login')
        }
      };
      fetchPost();
    }else {
      navigate('/admin/login')
      ToastError({status: "error",
                      message: "Please Sign In again."
                    })  
    }
  }, []);



  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseUserMenu = (event) => {
    setAnchorEl(null)
  }
 

  const handleLogout = () => {
    localStorage.clear()
    ToastSuccess("Logout")  
    setTimeout(() => {
      window.location.reload();
    }, 800);

  }

  

  return (
    <Card className="h-[60px] w-full max-w-[full] p-4 shadow-xl shadow-blue-gray-900/5">
             <div className="float-right mr-[calc(4vw)]">
                      <Avatar
                      className='text-white'
                      onClick= {handleUserClick}
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      sx={{
                        bgcolor:deepPurple[500],
                        color: "white",
                        cursor:"pointer",
                      }}
                      >R</Avatar>
                     
                      <Menu 
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={openUserMenu}
                      onClose={handleCloseUserMenu}
                      MenuListProps={{
                        "aria-labelledby":"basic-button",
                      }}>
                        <MenuItem onClick={handleCloseUserMenu}>
                          Profile
                        </MenuItem>
                    
                        <MenuItem  onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
              </div>
             
    </Card>
  );
};

export default Navbar;
