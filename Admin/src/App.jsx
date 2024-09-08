import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Order from './pages/Order/Order';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route } from 'react-router-dom'

const App = () => {

  return (
    <div>
      <ToastContainer />
     <Navbar />
     <hr />
     <div className="app_content">
      <Sidebar />
      <Routes>
        <Route path = "/add" element = {<Add />} />
        <Route path = "/list" element = {<List />} />
        <Route path = "/adminorder" element = {<Order />} />
      </Routes>
     </div>
    </div>
  )
}

export default App;