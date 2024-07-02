import React, { useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { RiDeleteBin7Fill } from 'react-icons/ri';
import intro from '../../assets/videos/intro.mp4'

function CourseModel({course, setOpen}) {
    const [data,setData] = useState(course.lectures);

    const addLecture = () => {
        setData([
            ...data,
            {
                "id":"#",
                "title":"",
                "description":"",
                "videoUrl":""
            }
        ])  
    }

  return (
    <div className='w-screen h-screen fixed  bg-white top-0 left-0 overflow-y-scroll '>
      <div className="flex justify-between items-center w-full my-10 ">
        <div className="w-2/3 text-center text-2xl">
            <h1 className='font-semibold'>{course.title} - #{course.id}</h1>
            <p className="">{course.description}</p>
        </div>
        <button onClick={()=>setOpen(false)} className='text-right mt-5 mx-10 text-3xl cursor-pointer '><IoCloseOutline /></button>
      </div>
      <div className="w-full flex justify-center m-0">
        <table className='w-4/5  text-sm text-left rtl:text-right'>
            <thead className="text-xs uppercase bg-yellow-500 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Video
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody className=''>
            {
                data.map(lecture => (
                    <VideoCard lecture={lecture} key={lecture.id}  />
                ))
            }
            </tbody>
        </table>
      </div>
        <div className=" w-full flex justify-center my-5">
            <button onClick={addLecture} className="text-center md:w-1/5 btn rounded-lg shadow-lg">
                Add More Lectures
            </button>
        </div>
    </div>
  )
}

export default CourseModel


export function VideoCard({lecture}){
    const [isSave,setSave] = useState(false);
    const [details,setDetails] = useState({
        id:lecture.id,
        title:lecture.title,
        description:lecture.description
    })

    const handleChange = (e) => {
        setDetails({
            ...details,
            [e.target.name]:e.target.value
        })
    }

    return (
        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
            <td name="id" className="px-2 py-3"><input className={`p-2 bg-white`} disabled type="text" value={lecture.id??''} placeholder='New id' required /></td>
            
            <td name="title" className="px-6 py-3"><input className={`p-2 bg-white ${isSave?'border border-yellow-500 focus:border-2 focus:outline-yellow-500 rounded-md':''}`} disabled={!isSave} type="text" value={lecture.title} placeholder='New title' required/></td>
            
            <td name="description" className="px-6 py-3"><input className={`p-2 bg-white ${isSave?'border border-yellow-500 focus:border-2 focus:outline-yellow-500 rounded-md':''}`} disabled={!isSave} type="text" value={lecture.description} placeholder='New description' required /></td>
            
            <td className="px-6 py-3"><video className='w-48 lg:h-32 object-fill shadow-md shadow-slate-500' controls controlsList="nodownload noremoteplayback" disablePictureInPicture src={intro}></video></td>
              
            <td className="px-6 py-3 h-32  flex gap-4 justify-evenly items-center">
              <button onClick={()=>setSave(!isSave)} className='px-4 py-2 border-2 font-semibold text-yellow-600 border-yellow-500 hover:bg-yellow-500 hover:text-black transition-all ease-in-out rounded-lg' >{isSave?'Save':'Edit'}</button>
              <RiDeleteBin7Fill onClick={()=>deleteHandler(course.id)} className='text-3xl text-yellow-600 hover:scale-110 transition-all ease-in-out cursor-pointer' />
          </td>
        </tr>
    )
}