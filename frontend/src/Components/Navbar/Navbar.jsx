import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/Context'
const Navbar = ({setpopup}) => {

   const [menu,setmenu] = useState("home");

   const {getTotalCartAmount,token,setToken} = useContext(StoreContext);
   
   const navigate = useNavigate();

   const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
   }

   const handleActve = (link) => {
    setmenu(link);
   }

  return (
    <div className='navbar'>
     <Link to="/"><img src={assets.logo} alt="Website Logo here" className='logo' /></Link>
      <ul className="navbar_menu">
        <Link to='/' className={menu === 'home' ? 'active' : ''} onClick={() => handleActve("home")}>Home</Link>
        <a href='#explore_menu' className={menu === 'menu' ? 'active' : ''} onClick={() => handleActve("menu")}>Menu</a>
        <a href = '#app_download' className={menu === 'mobile' ? 'active' : ''} onClick={() => handleActve("mobile")}>Mobile App</a>
        <a href='#footer' className={menu === 'contact' ? 'active' : ''} onClick={() => handleActve("contact")}>Contact us</a>
      </ul>
      <div className="navbar_right">
       <img src={assets.search_icon} alt="Search icon here" />
        <div className="navbar-search-icon">
           <Link to="/cart" style={{cursor:'pointer'}}><img src={assets.basket_icon} alt="" /></Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
       { !token ? <button onClick={() => setpopup(true)}>Sign in</button>
        : <div className='navbar_profile'>
          <img src={assets.profile_icon} alt="" />
         <ul className='nav_profile_logout'>
          <li onClick={() => navigate("/myorders")}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
          <hr />
          <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
         </ul>
        </div>

       } 
      </div>
    </div>
  )
}

export default Navbar
