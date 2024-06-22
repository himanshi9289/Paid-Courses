import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoCloseOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";

function Header() {
    const [isActive,setIsActive] = useState(false);
    const [isAuthenticated,setIsAuthenticated] = useState(true);

    const handleClick = () => {
        setIsActive(false);
    }
  return (
    <div >
        { !isActive &&
            <div onClick={()=>setIsActive(true)} className='text-4xl mt-16 mx-10 fixed cursor-pointer'>
                <IoMenu/>
            </div>
        }
        {isActive && <div className={`bg-[#f1d54a3c] backdrop-filter backdrop-blur-sm bg-opacity-10 h-screen fixed w-full z-10  flex justify-between transition-all ease-in `}>
            <div className="bg-white min-w-72 w-fit pt-10 text-center h-full">
                <h1 className='text-xl text-center my-5 font-bold'>COURSE BUNDLER</h1>
                <hr className='w-full h-0.5  bg-black' />
                <div className="my-5 space-y-10 text-left md:w-2/3 m-auto pl-3">
                    <p className="text-lg font-semibold hover:scale-110 transition-all" onClick={handleClick}><Link to={'/'} >Home</Link></p>
                    <p className="text-lg font-semibold hover:scale-110 transition-all" onClick={handleClick}><Link to={'/courses'} >Browse All courses</Link></p>
                    <p className="text-lg font-semibold hover:scale-110 transition-all" onClick={handleClick}><Link to={'/addcourse'} >Request a Course</Link></p>
                    <p className="text-lg font-semibold hover:scale-110 transition-all" onClick={handleClick}><Link to={'/contact'} >Contact Us</Link></p>
                    <p className="text-lg font-semibold hover:scale-110 transition-all" onClick={handleClick}><Link to={'/about'} >About</Link></p>
                </div>
                {!isAuthenticated ? <div className="space-x-2 px-5 fixed bottom-11">
                    <br />
                    <button onClick={handleClick}>
                        <Link to={'/login'} className='btn rounded-lg shadow-lg'>Login</Link> 
                    </button>
                    <span> OR </span>
                    <button onClick={handleClick}>
                        <Link to={'/signup'} className='btn rounded-lg shadow-lg'>Sign Up</Link>
                    </button>
                </div>
                    :
                <div className="space-x-2 px-5 fixed bottom-11">
                    <br />
                    <button onClick={handleClick}>
                        <Link to={'/login'} className='btn rounded-lg shadow-lg'>Profile</Link> 
                    </button>
                    <span> OR </span>
                    <button className='btn rounded-lg shadow-lg' onClick={()=>setIsAuthenticated(false)}>
                        LogOut
                    </button>
                </div>
                    
                }

            </div>
            <div onClick={handleClick} className='text-right mt-12 mx-5 text-4xl cursor-pointer '>
                <IoCloseOutline />
            </div>
            
        </div>}
    </div>
  )
}

export default Header
