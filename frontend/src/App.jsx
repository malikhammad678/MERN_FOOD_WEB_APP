import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import Placeorder from './Pages/Placeorder/Placeorder'
import Footer from './Components/Footer/Footer'
import LoginPopup from './Components/LoginPopup/LoginPopup'
import Verify from './Pages/Verify/Verify'
import Myorder from './Pages/Myorder/Myorder'
const App = () => {

  const [popup,setpopup] = useState(false);

  return (
    <>
    {popup ? <LoginPopup setpopup = {setpopup} /> : <></>}
    <div className='app'>
      <Navbar setpopup = {setpopup} />
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/cart' element = {<Cart />} />
        <Route path='/order' element = {<Placeorder />} />
        <Route path='/verify' element = {<Verify />} />
        <Route path='/myorders' element = {<Myorder />} />
      </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App
