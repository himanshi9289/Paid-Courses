import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { FaEye, FaUserAlt  } from "react-icons/fa";

function Sidebar() {
  return (
    <div className='text-center space-y-7 py-10 border-l-2 h-screen'>
        <LinkBtn Icon={MdDashboard} path={'/admin/dashboard'} text={'Dashboard'}  url={'/admin/dashboard'} />
        <LinkBtn Icon={IoIosAddCircle} path={'/admin/createcourse'} text={'Create Course'} url={'/admin/createcourse'} />
        <LinkBtn Icon={FaEye} path={'/admin/courses'} text={'Courses'} url={'/admin/courses'} />
        <LinkBtn Icon={FaUserAlt} path={'/admin/users'} text={'Users'} url={'/admin/users'} />
    </div>
  )
}
export default Sidebar


export const LinkBtn = ({Icon,path,text,url}) => {
    const location = useLocation();
    return (
        <Link to={url} className={`flex  justify-center p-4 items-center gap-2 text-lg ${path==location.pathname ? 'bg-yellow-500 font-semibold shadow-md text-black':''}`}>
            <Icon/>
            <h1 className="">{text}</h1>
        </Link>
    );
} 
