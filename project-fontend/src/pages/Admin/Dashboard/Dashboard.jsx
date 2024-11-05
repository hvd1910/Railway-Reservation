import { Grid } from '@mui/material'
import React from 'react'
import Sidebar from '../../../Admin/component/Sidebar/Sidebar'
import Navbar from '../../../Admin/component/Sidebar/Navbar'
import DashboardLayout from '../../../Admin/component/DashboardLayout/DashboardLayout'

const Dashboard = () => {
 
  return (
    <div>
         <Grid container spacing={0} >
            <Grid item xs={2} >
            <Sidebar/>
            </Grid>
            <Grid item xs={10}>
                <Navbar/>
                <div  xs={12}className='flex pt-3 pl-4 pb-0'>
                <DashboardLayout/>
                </div>
            </Grid>
        </Grid>
      
    </div>
  )
}

export default Dashboard;
