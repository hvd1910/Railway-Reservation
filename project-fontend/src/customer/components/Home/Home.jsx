import React, { useState } from 'react'
import './Home.css'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import ComboBoxDate from '../../../Admin/component/ScheduleForm/ComboBoxDate';

function Home() {
    const navigate = useNavigate();
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split("T")[0];



    const handleSubmit = (e)=> {
        e.preventDefault();
        
    const data = new FormData(e.currentTarget);
    const  Data= {
        route_from: data.get("route_from"),
        route_to: data.get("route_to"),
        date_schedule: data.get("date_schedule"),
    };

    navigate("/booking", {state: Data})
        
    }
    return (
        <div className='ticket-form  justify-center h-full'>
            <h1 className='p-0 mt-8'>Journey information</h1>
            <div className='w-[100%] '>
            <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 my-5 bg-slate-100 rounded-2xl justify-center inline-block ">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3  mb-6 md:mb-0 ">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Go away
                        </label>
                        <ComboBoxDate nameobject={"route_from"} />
                    </div>
                    <div className="w-full md:w-1/2 px-3 pl-6 ">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Arrivals
                        </label>
                        <ComboBoxDate nameobject={"route_to"} />
                    </div>
                </div>
                <div  className="flex items-center">
                    <div className="relative lg:w-1/2">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                        </div>
                        <input required name="date_schedule" type="date" min={currentDateString} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start" />
                    </div>
                    <span className="mx-4 text-gray-500">to</span>
                    <div className="relative lg:w-1/2">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                        </div>
                        <input disabled name="end" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end" />
                    </div>
                </div>
                <div className="flex gap-x-6 pt-6 mb-4">
                    <div className="flex">
                        <input defaultChecked type="radio" name="hs-radio-group" className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-radio-group-1"  />
                        <label htmlFor="hs-radio-group-1" className="text-sm text-gray-500 ms-2 dark:text-gray-400">One-way</label>
                    </div>

                    <div className="flex">
                        <input  disabled type="radio" name="hs-radio-group" className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-radio-group-2" />
                        <label  htmlFor="hs-radio-group-2" className="text-sm text-gray-500 ms-2 dark:text-gray-400">Round-trip</label>
                    </div>
                </div>
                <Button variant='contained' type="submit" style={{ backgroundColor: 'rgb(4, 170, 107)',
                        color: '#fff',
                         padding: '0.5rem 1rem',
                        borderRadius: '1rem', 
                         width: '100%',
                        transition: 'background-color 0.3s'}} className='font-semibold' size='small'>

                    Search
                </Button>
            </form>
            </div>
        </div>
    )
}

export default Home