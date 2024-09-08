import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const List = () => {

  const [list, setList] = useState([]);

  const url = "http://localhost:4000";

  const ListItems = async () => {
    const response = await axios.get(`${url}/app/food/list`)

    console.log(response)

    if (response.data.success) {
      setList(response.data.data);
    }
    else {
      toast.error("Error")
    }
  }

  const deleteItem = async (itemId) => {
    const response = await axios.post(`${url}/app/food/remove`, { id: itemId });
    await ListItems();

    if (response.data.success) {
      toast.success(response.data.message)
    }
    else {
      toast.error("error");
    }
  }

  useEffect(() => {
    ListItems();
  }, [])
  
  return (
    <div className='list add flex_col'>
      <h2>All Food List</h2>
      <div className="list_table">
        <div className="list_table_format title">
          <strong>Image</strong>
          <strong>Name</strong>
          <strong>Category</strong>
          <strong>Price</strong>
          <strong>Action</strong>
        </div>
        {
          list.map((item, index) => {
            return (
              <div key={index} className="list_table_format">
                <img src={`${url}/images/` + item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p onClick={() => deleteItem(item._id)} className='cursor'>X</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default List
