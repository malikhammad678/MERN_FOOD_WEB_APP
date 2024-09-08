import React, { useState, useEffect } from 'react';
import './Order.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:4000/app/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Error fetching orders");
    }
  };

  const statusHandler = async (e,orderId) => {
     const response = await axios.post("http://localhost:4000/app/order/update",{
      orderId,
      status:e.target.value
     })
     if(response.data.success){
      await fetchOrders();
     }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className='order_add'>
      <h3>Order List</h3>
      <div className="order_list">
        {orders.map((order, index) => (
          <div key={index} className="order_item">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className='order_item_food'>
                {order.items.map((item, itemIndex) => (
                  `${item.name}x${item.quantity}${itemIndex === order.items.length - 1 ? '' : ','}`
                ))}
              </p>
              <p className='order_item_name'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order_item_address_details">
                <p>{order.address.street + ","}</p>
                <p className='order_item_address'>
                  {order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.zipCode}
                </p>
              </div>
              <p className="order_item_phone">{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>Amount: ${order.amount}</p>
              <select onChange = {(e) => statusHandler(e,order._id)} value = {order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out of Delivery">Out of Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

        ))}
      </div>
    </div>
  );
};

export default Order;
