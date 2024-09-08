import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/Context'
import { useNavigate } from 'react-router-dom';
const Cart = () => {

  const {cartItem, food_list, removeFromCart, getTotalCartAmount,url} = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart_items">
        <div className="cart_item_title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((item,index) => {
            if(cartItem[item._id] > 0 ) {
              return (
                <div>
                <div className="cart_item_title cart_items_item">
                   <img src={url + "images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>x{cartItem[item._id]}</p>
                  <p>${item.price*cartItem[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
                </div>
              )
            }
          })
        }
      </div>
      <div className="cart_bottom">
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
              <strong style={{fontWeight:'700'}}>Total</strong>
              <strong style={{fontWeight:'700'}}>${getTotalCartAmount() === 0? 0 : getTotalCartAmount() + 2}</strong>
            </div>
            </div>
            <button onClick={() => navigate("/order")}>PROCEED TO CHECKOUT</button>
          </div>
          <div className="cart_promode">
            <div>
              <p>If you have promo code, Enter it here</p>
              <div className="cart_promocode_input">
                <input type="text" placeholder=' Enter promo code' />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Cart
