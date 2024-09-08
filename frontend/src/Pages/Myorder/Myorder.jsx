import React, { useContext, useEffect, useState } from 'react'
import './Myorder.css'
import { StoreContext } from '../../Context/Context'
import axios from 'axios';
import { assets } from '../../assets/assets';
const Myorder = () => {

  const {url,token} = useContext(StoreContext);

  const [data,setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(url + "app/order/userorder", {} , {headers : {token}});
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    if(token) {
      fetchOrders();
    }
  },[token]);

  return (
    <div className='my_orders'>
       <h2>My Orders</h2>
       <div className="container">
        {
          data.map((order,index) => {
            return (
              <div key={index} className="my_orders_order">
                 <img src={assets.parcel_icon} alt="" />
                 <p>{order.items.map((item,index) => {
                    if(index === order.items.length - 1){
                      return item.name + "x" + item.quantity
                    }
                    else {
                      return item.name + "x" + item.quantity + " , "
                    }
                 })}</p>
                 <p>${order.amount}.00</p>
                 <p>Total Items: {order.items.length}</p>
                 <p><span>&#x25cf;</span> <strong style={{fontWeight:'700'}}>{order.status}</strong></p>
                 <button onClick = {fetchOrders}>Track Order</button>
              </div>
            )
          })
        }
       </div>
    </div>
  )
}

export default Myorder
