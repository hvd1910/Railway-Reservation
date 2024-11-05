import React from 'react'
import './Navbar.css'
import logo from '../images/logo.png'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()
  return (
    <nav className='nav-wrapper'>
        <div className="nav-content">
            <img className='logo cursor-pointer' src={logo} alt="" onClick={()=> navigate('/')}/>
            <ul>
                <li>
                    <a className="menu-item" onClick={()=> navigate('/')}>Home</a>
                </li>
                <li>
                    <a className="menu-item" onClick={()=> navigate('/pay-ticket')}>Pay Ticket</a>
                </li>
                <li>
                    <a className="menu-item" onClick={()=> navigate('/find-ticket')}>Find Ticket</a>
                </li>
                <li>
                    <a className="menu-item" onClick={()=> navigate('/regulation')}>Regulation</a>
                </li>
                <li>
                    <a className="menu-item" onClick={()=> navigate('/contact-us')}>Contact Us</a>
                </li>
                
             
                
            </ul>
        </div>
    </nav>
  )
}

export default Navbar