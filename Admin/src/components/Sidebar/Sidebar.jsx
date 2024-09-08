import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Link , NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar_options">
            <NavLink to='/add' className="sidebar_option">
                <img src={assets.add_icon} alt="" />
                <p>Add Item</p>
            </NavLink>
            <NavLink to='/list' className="sidebar_option">
                <img src={assets.order_icon} alt="" />
                <p>List Item</p>
            </NavLink>
            <NavLink to='adminorder' className="sidebar_option">
                <img src={assets.order_icon} alt="" />
                <p>Orders</p>
            </NavLink>
        </div>
      
    </div>
  )
}

export default Sidebar
