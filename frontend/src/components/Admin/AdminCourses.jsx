import React from 'react';
import Sidebar from './Sidebar';
import { useState } from 'react';
import { RiDeleteBin7Fill } from "react-icons/ri";
import courseData from './courseData.json';
import CourseModel from './CourseModel';

function AdminCourses() {
  const [data,setData] = useState(courseData);
  const [isOpen,setOpen] = useState(false);

  const updateHandler = (userId) => {
      console.log(userId);
  }

  const deleteHandler = (userId) => {
      console.log(userId);
  }
  return (
    <div className='flex justify-between lg:ml-16 md:overflow-hidden overflow-scroll '>
      <div className="w-5/6 mt-16 lg:overflow-hidden overflow-scroll">
        <h1 className="text-3xl text-center text-yellow-500 font-bold mb-8">All Courses</h1>
        <table className='w-full text-sm text-left rtl:text-right '>
            <thead className="text-xs uppercase bg-yellow-500 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                <th scope="col" className="px-6 py-3">
                        ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Poster
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Creator
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Views
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Lecture
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody className=''>
            {
                data.map(course =>
                    <tr key={course.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                        <Rows course={course} updateHandler={updateHandler} deleteHandler={deleteHandler} setOpen={setOpen}/>
                        {isOpen===course.id && <CourseModel course={course} setOpen={setOpen}/>}
                    </tr>
                )
            }
            </tbody>
        </table>
        <p className="text-center">All Avialable Courses in Database</p>
      </div>
      <Sidebar />
    </div>
  )
}

export default AdminCourses

export const Rows = ({course , updateHandler, deleteHandler, setOpen }) => {
  return(
        <>
          <td className="px-6 py-3">
              {course.id}
          </td>
          <td className="px-6 py-3">
              <img className=' w-48 lg:h-32 shadow-md shadow-slate-500' src={course.posterUrl} alt="thumbnail" />
          </td>
          <td className="px-6 py-3">
              {course.title}
          </td>
          <td className="px-6 py-3">
              {course.category}
          </td>
          <td className="px-6 py-3">
              {course.creator}
          </td>
          <td className="px-6 py-3">
              {course.views}
          </td>
          <td className="px-6 py-3">
              {course.lectures.length}
          </td>
          <td className="px-6 py-3 h-32  flex gap-4 justify-evenly items-center">
              <button onClick={()=>setOpen(course.id)} className='px-4 py-2 border-2 font-semibold text-yellow-600 border-yellow-500 hover:bg-yellow-500 hover:text-black transition-all ease-in-out  rounded-lg'>Views Lecture</button>
              <RiDeleteBin7Fill onClick={()=>deleteHandler(course.id)} className='text-3xl text-yellow-600 hover:scale-110 transition-all ease-in-out cursor-pointer' />
          </td>
        </>
  )
}