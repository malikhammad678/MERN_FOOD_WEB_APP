import React, { useContext, useEffect, useState } from 'react';
import './Placeorder.css';
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/Context';
import axios from 'axios';

const Placeorder = () => {
  const { getTotalCartAmount, food_list, cartItem, url, token } = useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    console.log("Current data:", data);
  }, [data]);

  const placeorder = async (e) => {
    e.preventDefault();
    
    let orderItems = food_list.filter(item => cartItem[item._id] > 0).map(item => ({
      ...item,
      quantity: cartItem[item._id]
    }));
    
    let orderData = {
      userId: token, 
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    };

    console.log("Order Data:", orderData);

    try {
      let response = await axios.post(`${url}app/order/placeorder`, orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order");
    }
  }


  useEffect(() => {
    if(!token) {
        navigate("/cart")
    }
    else if(getTotalCartAmount === 0) {
      navigate("/cart")
    }
  })

  return (
    <form onSubmit={placeorder} className='place_order'>
      <div className="place_order_left">
        <p className="title">Delivery Information</p>
        <div className="multi_fields">
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' />
        <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Address' />
        <div className="multi_fields">
          <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi_fields">
          <input name='zipCode' onChange={onChangeHandler} value={data.zipCode} type="number" placeholder='Zip code' />
          <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input name='phone' onChange={onChangeHandler} value={data.phone} type="number" placeholder='Phone' />
      </div>

      <div className="place_order_right">
        <div className="cart_total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart_total_detail">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart_total_detail">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart_total_detail">
              <strong style={{ fontWeight: '700' }}>Total</strong>
              <strong style={{ fontWeight: '700' }}>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</strong>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
