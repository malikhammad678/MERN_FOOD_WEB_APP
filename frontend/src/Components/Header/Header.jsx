import React from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
const Header = () => {

  const navigate = useNavigate();
  return (
    <div className='header'>
      <div className="header_content">
        <h2>Order your favourite food here</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, eius ducimus. Esse tempore quis repellat atque veritatis. Optio, culpa excepturi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad perspiciatis similique soluta harum. Eveniet perspiciatis, accusamus placeat eius laborum nulla.</p>
        <a href="#explore_menu"><button>View Menu</button></a>
      </div>
    </div>
  )
}

export default Header
