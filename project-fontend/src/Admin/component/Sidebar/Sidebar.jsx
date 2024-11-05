import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import {
  ChevronRightIcon,
  ChevronDownIcon,

} from "@heroicons/react/24/outline";
import DashboardIcon from '@mui/icons-material/Dashboard';
import TrainIcon from '@mui/icons-material/Train';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RailwayAlertIcon from '@mui/icons-material/RailwayAlert';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import Groups2Icon from '@mui/icons-material/Groups2';
import { useNavigate } from "react-router-dom";
import Logo from "../../../customer/components/images/logo.png"
const   Sidebar = ()=> {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(0);


  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (
    <Card className="h-[100vh] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-violet-700">
      <div className="mb-2 flex items-center gap-4 p-4 justify-center">
        <img src={Logo} alt="brand" className=" w-[70%] " />
      </div>
      <List>
      <ListItem  onClick={()=> navigate('/admin')} className="text-gray-200  hover:bg-violet-400 font-normal ">
          <ListItemPrefix>
            <DashboardIcon className="h-5 w-5 mr-2" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0 text-gray-200 hover:bg-violet-400" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                 <TrainIcon className="h-5 w-5 mr-2" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Train
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1" style={{ display: open === 1 ? 'block' : 'none' }}>
            <List className="p-0">
              <ListItem onClick={()=> navigate('/admin/train')}  className="text-gray-200  hover:bg-violet-400">
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Manage Trains
              </ListItem>
              
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 5}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 5 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0 text-gray-200 hover:bg-violet-400" selected={open === 5}>
            <AccordionHeader onClick={() => handleOpen(5)} className="border-b-0 p-3">
              <ListItemPrefix>
                 <RailwayAlertIcon className="h-5 w-5 mr-2" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Station
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1" style={{ display: open === 5 ? 'block' : 'none' }}>
            <List className="p-0">
              
              <ListItem onClick={()=> navigate('/admin/station')} className="text-gray-200  hover:bg-violet-400">
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Manage Station
              </ListItem>
              
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 4}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 4 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0 text-gray-200 hover:bg-violet-400" selected={open === 4} >
            <AccordionHeader onClick={() => handleOpen(4)} className="border-b-0 p-3">
              <ListItemPrefix>
                <CalendarMonthIcon className="h-5 w-5 mr-2" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
              Schedule Train
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1" style={{ display: open === 4 ? 'block' : 'none' }}>
            <List className="p-0">
            
              <ListItem onClick={()=> navigate('/admin/schedule')}  className="text-gray-200  hover:bg-violet-400">
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Manage Schedules
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
       
        <Accordion
          open={open === 3}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0 text-gray-200 hover:bg-violet-400" selected={open === 3}>
            <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
              <ListItemPrefix>
                <ConfirmationNumberIcon className="h-5 w-5 mr-2" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
              Tickets
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1" style={{ display: open === 3 ? 'block' : 'none' }}>
            <List className="p-0">
            
            
              <ListItem onClick={()=> navigate('/admin/ticket')} className="text-gray-200  hover:bg-violet-400">
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Manage Tickets
              </ListItem>

              <ListItem onClick={()=> navigate('/admin/ticketprice')}  className="text-gray-200  hover:bg-violet-400">
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Manage Ticket Price
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 7}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0 text-gray-200 hover:bg-violet-400" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(7)} className="border-b-0 p-3">
              <ListItemPrefix>
                <PriceChangeIcon className="h-5 w-5 mr-2" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
              Payment
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1" style={{ display: open === 7 ? 'block' : 'none' }}>
            <List className="p-0 ">
              
              <ListItem onClick={()=> navigate('/admin/payment')} className="text-gray-200  hover:bg-violet-400">
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Manage Payment
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 7 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0 text-gray-200 hover:bg-violet-400" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <Groups2Icon className="h-5 w-5 mr-2" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
              User
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1" style={{ display: open === 2 ? 'block' : 'none' }}>
            <List className="p-0 ">
              
              <ListItem onClick={()=> navigate('/admin/user')} className="text-gray-200  hover:bg-violet-400">
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Manage User
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        
        
        
      </List>
      
    </Card>
  );
}

export default Sidebar;