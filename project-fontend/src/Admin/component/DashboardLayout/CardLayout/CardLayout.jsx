import React, { useEffect, useState } from 'react'
import EventNoteIcon from '@mui/icons-material/EventNote';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { API_BASE_URL } from "../../../../config/apiConfig";
import axios from 'axios';

const CardLayoutA = ({titleLayout, icon, nameObject}) => {

  const [data, setData] = useState(0)

  useEffect(()=> {
    const getCount = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/Home/${nameObject}` );
        
        if(res.data.status !== "error") {
          setData(res.data)
        }
        
      } catch {
      }
    };
      getCount();
    
  })


  return (
    <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
    <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
      <div className="flex-auto p-4">
        <div className="flex flex-row -mx-3">
          <div className="flex-none w-2/3 max-w-full px-3 text-left">
            <div>
              <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">{titleLayout}</p>
             {icon == 1 &&  <h5 className="mb-2 font-bold dark:text-white ">{data}</h5> }
             {icon == 2 &&  <h5 className="mb-2 font-bold dark:text-white ">{data}</h5> }
             {icon == 3 &&  <h5 className="mb-2 font-bold dark:text-white ">{data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ</h5> }
             {icon == 4 &&  <h5 className="mb-2 font-bold dark:text-white ">{data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ</h5> }
              
            </div>
          </div>
          <div className="px-3 text-right basis-1/3">
            {icon == 1 && <div className="inline-block w-12 h-12 text-center rounded-circle rounded-[50%] bg-gradient-to-tl from-blue-500 to-violet-500">
              <i className="ni leading-none ni-money-coins text-lg relative top-2.5 text-white">
               <EventNoteIcon/>
              </i>
            </div>}
            {icon == 2 && <div className="inline-block w-12 h-12 text-center rounded-circle rounded-[50%] bg-gradient-to-tl from-red-600 to-orange-600">
              <i className="ni leading-none ni-money-coins text-lg relative top-2.5 text-white">
               <BookOnlineIcon/>
              </i>
            </div>}
            {icon == 3 && <div className="inline-block w-12 h-12 text-center rounded-circle rounded-[50%] bg-gradient-to-tl from-emerald-500 to-teal-400">
              <i className="ni leading-none ni-money-coins text-lg relative top-2.5 text-white">
               <PriceChangeIcon/>
              </i>
            </div>}
            {icon == 4 && <div className="inline-block w-12 h-12 text-center rounded-circle rounded-[50%] bg-gradient-to-tl from-orange-500 to-yellow-500">
              <i className="ni leading-none ni-money-coins text-lg relative top-2.5 text-white">
               <CurrencyExchangeIcon/>
              </i>
            </div>}
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CardLayoutA
