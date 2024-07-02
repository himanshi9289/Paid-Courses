import React, { useState } from 'react'
import Sidebar from './Sidebar'

function CreateCourse() {
    const [details,setDetails] = useState({
        title:"",
        description: "",
        creatorName: "",
        category:"" 
    });
    const [image, setImage] = useState('');
    const [imagePrev, setImagePrev] = useState('');

    const options = ['Web development', 'Artificial Intellegence','Data Structure & Algorithm','App Development','Data Science','Game Development']

    const handleChange = (e) => {
        setDetails({
            ...details,
            [e.target.name]:e.target.value
        })
        console.log(details)
    }

    ﻿

    const changeImageHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => { setImagePrev (reader.result); setImage(file); };
    }

  return ( 
    <div className='flex justify-between'>
      <div className="w-5/6 m-auto flex justify-center">
        <form className='md:w-1/3 px-2' method="post">
            <h1 className="text-3xl text-center text-yellow-500 font-bold mb-8">Add a Course</h1>
            <input type="text" onChange={handleChange} name='title' value={details.title} className="input " placeholder='Title'  required  />
            <input type="text" onChange={handleChange} name='description' value={details.description} className="input" placeholder='Description'   required />
            <input type="text" onChange={handleChange} name='creatorName' value={details.creatorName} className="input" placeholder='Creators Name'  required  />
            <select className='input' onChange={handleChange} value={details.category} name="category" id="">
                <option value="">Category</option>
                {options.map(value => 
                    <option key={value} value={value}>{value}</option>
                )}
            </select>
            <input accept='image/*' className='input' onChange={changeImageHandler} type="file" name="" id="" required />
            {
                imagePrev && <img src={imagePrev} alt="Selected Image" className=" object-contain h-56 w-full text-center my-5"  />
            }

            <button type='submit' className='btn w-full rounded-lg '>Add</button>
        </form>
      </div>
      <Sidebar />
    </div>
  )
}

export default CreateCourse
