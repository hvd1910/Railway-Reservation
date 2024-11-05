import { Grid } from '@mui/material'
import React from 'react'
import Sidebar from '../../../Admin/component/Sidebar/Sidebar'
import Navbar from '../../../Admin/component/Sidebar/Navbar'
import ScheduleListTable from '../../../Admin/component/ScheduleForm/ScheduleListTable'

const ListSchedule = () => {
 
  return (
    <div>
         <Grid container spacing={0} >
            <Grid item xs={2} >
            <Sidebar/>
            </Grid>
            <Grid item xs={10}>
                <Navbar/>
                <div  xs={10}className='flex p-14 pb-0'>
                <ScheduleListTable/>
                </div>
            </Grid>
        </Grid>
      
    </div>
  )
}

export default ListSchedule;
