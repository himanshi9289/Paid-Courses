import React, { useState } from 'react'

function Login() {
    const[details,setDetails] = useState({
        email:"",
        password:""
    });

    const handleChange = (e) => {
        setDetails({...details, [e.target.name]:e.target.value});
        console.log(details)
    }

  return (
    <div className='h-screen overflow-x-hidden flex items-center justify-center '>
        <form action="" method="post" className='md:w-1/3 px-5'>
            <h1 className="text-3xl text-center text-yellow-500 font-bold mb-8">Welcome to Course Bundler</h1>
            
            <label className='my-2' htmlFor="">Email Address</label>
            <input onChange={handleChange} name='email' type="text" placeholder='abc@gmail.com'  className='input' />
            
            <label className='' htmlFor="">Password</label>
            <input onChange={handleChange} name='password' type="password" placeholder='Enter Password' className='input' />

            <button className="mb-4 ">Forgot Password ? </button>

            <button onClick={(e)=>{e.preventDefault()}} type='submit' className='w-full btn rounded-full'>Login</button>
        </form>
    </div>
  )
}

export default Login
