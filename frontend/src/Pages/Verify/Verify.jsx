import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';
import { StoreContext } from '../../Context/Context';
const Verify = () => {

   const [searchParams, setSearchParams] = useSearchParams();

   const success = searchParams.get("success")
   const orderId = searchParams.get("orderId")
   const {url} = useContext(StoreContext);
   const navigate = useNavigate();

   const verifyPayment = async (req,res) => {
    const response = await axios.post(url + "app/order/verify", {success,orderId});
    if(response.data.success) {
    navigate("/myorders");
    }
    else {
        navigate("/");
    }
   }

   useEffect(() => {
    verifyPayment();
   },[])

  return (
    <div className='verify'>
     <div className="spinner"></div>
    </div>
  )
}

export default Verify
