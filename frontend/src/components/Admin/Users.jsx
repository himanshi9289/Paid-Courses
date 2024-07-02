import React from 'react'
import Sidebar from './Sidebar'
import { useState } from 'react'
import { RiDeleteBin7Fill } from "react-icons/ri";

function Users() {
    const [data,setData] = useState([{
        id:"1231212",
        name:"Some User",
        email:"SomeUser#gmail.com",
        role:"admin",
        subscription:"active",
        action:""
    }]);

    const updateHandler = (userId) => {
        console.log(userId);
    }
    
    const deleteHandler = (userId) => {
        console.log(userId);
    }

  return (
    <div className='flex justify-between md:ml-16 md:overflow-hidden overflow-scroll '>
      <div className="w-5/6 mt-16 md:overflow-hidden overflow-scroll">
        <h1 className="text-3xl text-center text-yellow-500 font-bold mb-8">All Users</h1>
        <table className='w-full text-sm text-left rtl:text-right '>
            <thead className="text-xs uppercase bg-yellow-500 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Role
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Subscription
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody className=''>
            {
                data.map(user => 
                    <Rows user={user} updateHandler={updateHandler} deleteHandler={deleteHandler} key={user.id}/>
                )
            }
            </tbody>
        </table>
        <p className="text-center">All Avialable users in Database</p>
      </div>
      <Sidebar />
    </div>
  )
}

export default Users


export const Rows = ({user , updateHandler, deleteHandler}) => {
    return(
        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
            <td className="px-6 py-3">
                {user.id}
            </td>
            <td className="px-6 py-3">
                {user.name}
            </td>
            <td className="px-6 py-3">
                {user.email}
            </td>
            <td className="px-6 py-3">
                {user.role}
            </td>
            <td className="px-6 py-3">
                {user.subscription}
            </td>
            <td className="px-6 py-3 flex justify-evenly items-center">
                <button onClick={()=>updateHandler(user.id)} className='px-4 py-2 border-2 font-semibold text-yellow-600 border-yellow-500 hover:bg-yellow-500 hover:text-black transition-all ease-in-out  rounded-lg'>Change Role</button>
                <RiDeleteBin7Fill onClick={()=>deleteHandler(user.id)} className='text-3xl text-yellow-600 hover:scale-110 transition-all ease-in-out cursor-pointer' />
            </td>
        </tr>
    )
}
