import React, { useEffect, useState } from 'react'
import './Add.css'
import axios from 'axios'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
const Add = () => {


  const [image,setImage] = useState(false);

  const [data,setdata] = useState({
    name:"",
    description:"",
    price:"",
    category:"Salad"
  });

  const onChangeHandler = (event) => {
  const name = event.target.name;
  const value = event.target.value;

  setdata(data => ({...data,[name] : value}))
  }

const onSubmitHandler = async (e) => {
   e.preventDefault();
   let url = "http://localhost:4000"
   const formData = new FormData();
   formData.append("name",data.name)
   formData.append("description",data.description)
   formData.append("price",Number(data.price))
   formData.append("category",data.category)
   formData.append("image",image);

   const response = await axios.post(`${url}/app/food/add`,formData);

   if(response.data.success) {
  setdata({
    name:"",
    description:"",
    price:"",
    category:"Salad"
  })
    setImage(false);

    toast.success(response.data.message)

   }
   else {
    toast.error(response.data.message)
   }

}

  return (
    <div className='add'>
      <form className='flex_col' onSubmit={onSubmitHandler}>
        <div className="add_img_upload flex_col">
            <p>Upload Image</p>
            <label htmlFor="image">
                <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
            </label>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="add_product_name flex_col">
            <p>Product name</p>
            <input onChange={onChangeHandler} value={data.name} type="text" placeholder='Enter here...' name='name' />
        </div>
        <div className="add_product_description flex_col">
               <p>Product description</p>
               <textarea onChange={onChangeHandler} value={data.description} name="description" rows={10} placeholder='Enter content here...' required></textarea>
        </div>
        <div className="add_category_price">
            <div className="add_category flex_col">
                <p>Product Category</p>
                <select onChange={onChangeHandler} name="category">
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Vegetable</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                </select>
            </div>
            <div className="add_price flex_col">
                <p>Product price</p>
                <input onChange={onChangeHandler} value={data.price} type="number" placeholder='$20' required name='price' />

            </div>
        </div>
        <button type='submit' className='add_btn'>Add Item</button>
      </form>
    </div>
  )
}

export default Add
