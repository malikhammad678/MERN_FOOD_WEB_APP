import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer_content">
        <div className="footer_content_left">
           <img src={assets.logo} alt="" />
           <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit, fuga maxime voluptatum alias quaerat repudiandae.</p>
           <div className="social_icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
           </div>
        </div>
        <div className="footer_content_center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer_content_right">
        <h2>Get in touch</h2>
        <ul>
            <li>+1-222-333-444</li>
            <li>contact@tomato.com</li>
        </ul>
        </div>
      </div>
      <hr />
      <div className="footer_copyright">Developed by <span>Muhammad Hammad</span> - All Right Reserved</div>
    </div>
  )
}

export default Footer
