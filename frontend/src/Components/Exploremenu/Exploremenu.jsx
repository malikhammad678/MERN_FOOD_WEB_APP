import React from 'react'
import './Exploremenu.css'
import { menu_list } from '../../assets/assets'

const Exploremenu = ({category,setCategory}) => {
  return (
    <div className='explore_menu' id='explore_menu'>
      <h2>Explore our menu</h2>
      <p className='explore_menu_text'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus placeat aliquam facilis nihil numquam voluptates, odit adipisci minima at maiores.</p>
      <div className="explore_menu_list">
        {

            menu_list.map((item,index) => {
          return (
            <div key={index} onClick={() => setCategory(prev => prev === item.menu_name? "All" : item.menu_name )} className="explor_menu_list_item">
               <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
               <p>{item.menu_name}</p>
            </div>
          )
        })
        
        }
      </div>
      <hr />
    </div>
  )
}

export default Exploremenu
