import {API_BASE_URL} from '../../../config/apiConfig'
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'

const Fare = ({nameTicket, distance, total}) => {
    const [ticketPrice, setTicketPrice] = useState(null)
    const typeSeat = nameTicket.slice(0, -1).toUpperCase()

    useEffect(()=> {

        const fetchPost = async () => {
            try {
              const res = await axios.get(`${API_BASE_URL}/api/TicketPrices`);
              
              if(res.data.status !== "error") {
                setTicketPrice(res.data.find((ticket) =>{
                    return ticket.ticketName === typeSeat;
                }))
              }
              
            } catch {
            }
          };
      
          if(nameTicket != null) {
            fetchPost();
          }
    }, [nameTicket])

    useEffect(() => {
      if (ticketPrice != null) {
        total(ticketPrice.price * distance);
      }
    }, [ticketPrice, distance, total]);
  return (
    <Fragment>
      {ticketPrice!= null && <Fragment>{ticketPrice.price * distance}</Fragment>}
    </Fragment>
  )
}

export default Fare
