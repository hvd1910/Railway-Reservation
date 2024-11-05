import React, { useEffect, useState } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import axios from 'axios';
import { API_BASE_URL } from "../../../../config/apiConfig";



const PaymentChartLayout = () => {

  const [dates, setdates] = useState([])
  const [totalAmounts, setTotalAmounts] = useState([])
  const [dataPayments, setDataPayments] = useState([])

 
  useEffect(()=> {
    const getCount = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/Home/weekAmount` );
        
        if(res.data.status !== "error") {
          setdates(res.data.map(item => item.date))
          setTotalAmounts(res.data.map(item => item.totalAmount))
        }
        
      } catch {
      }
    };
      getCount();
     
  }, [])

  useEffect(()=> {
    const getPayment = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/Home/GetPayment` );
        
        if(res.data.status !== "error") {
          setDataPayments(res.data)
        }
        
      } catch {
      }
    };
    getPayment();
  }, [])


  const chartConfig = {
    type: "line",
    height: 320,
    series: [
      {
        name: "Amount",
        data: totalAmounts,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: dates,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };


  return (
    <div className="flex flex-wrap mt-6 -mx-3">
    <div className="w-full max-w-full px-3 mt-0 lg:w-7/12 lg:flex-none break-words bg-white border-0 border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl dark:bg-gray-950 border-black-125 rounded-2xl bg-clip-border">
        <div className="flex-auto p-4 pl-0">
        <div className=''>
      
        <h6 className="capitalize dark:text-white text-left mt-2">Amount overview</h6>
      <CardBody className="px-2 pb-0  ">
        <Chart {...chartConfig} />
      </CardBody>
    </div>
        </div>
    
    </div>

    <div className="w-full max-w-full px-3 lg:w-5/12 lg:flex-none pt-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white border-0 border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl dark:bg-gray-950 border-black-125 rounded-2xl bg-clip-border">
              <div className="p-4 pb-0 mb-0 rounded-t-4">
                <div className="flex justify-between">
                  <h6 className="mb-2 dark:text-white">Latest Payment History</h6>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="items-center w-full mb-4 align-top border-collapse border-gray-200 dark:border-white/40 mb-[62px]">
                  <tbody>
                    
                  {dataPayments.map((item)=> (  <tr key={item.id}>
                      <td className="p-2 align-middle bg-transparent border-b w-3/10 whitespace-nowrap dark:border-white/40">
                        <div className="flex items-center px-2 py-1">
                          <div className="ml-2">
                            <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">Transaction Number</p>
                            <h6 className="mb-0 text-sm leading-normal dark:text-white">{item.transaction_number}</h6>

                          </div>
                        </div>
                      </td>
                      <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40">
                        <div className="text-center">
                          <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">Payment Method</p>
                          <h6 className="mb-0 text-sm leading-normal dark:text-white">{item.payment_method}</h6>

                        </div>
                      </td>
                      <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40">
                        <div className="text-center">
                          <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">Total (VNĐ)</p>
                          <h6 className="mb-0 text-sm leading-normal dark:text-white">{item.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h6>

                        </div>
                      </td>
                      <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40">
                        <div className="text-center">
                          <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">Status</p>
                          <h6 className="mb-0 text-sm leading-normal dark:text-white">{item.status}</h6>

                        </div>
                      </td>
                    </tr>))}
                  
       
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
    </div>
  )
}

export default PaymentChartLayout
