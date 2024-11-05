import React from 'react'
import CardLayout from './CardLayout/CardLayout'
import PaymentChartLayout from './CardLayout/PaymentChartLayout'

const DashboardLayout = () => {
  return (
    <div className='w-full'>
      <div className="w-full px-6 py-6 mx-auto">
        <div className="flex flex-wrap -mx-3">
       
            <CardLayout titleLayout={"TODAY'S TRIP"} icon={1} nameObject={"todaySchedule"}/>
            <CardLayout titleLayout={"TODAY'S TICKET "} icon={2} nameObject={"todayTicket"}/>
            <CardLayout titleLayout={"TODAY'S AMOUNT"} icon={3} nameObject={"todayAmount"}/>
            <CardLayout titleLayout={"TODAY'S REFUNDED"} icon={4} nameObject={"todayRefund"}/>

        </div>
       
        <PaymentChartLayout/>

      </div>
    </div>
  )
}

export default DashboardLayout
