import React from 'react';
import background from '../../assets/images/bg.png'
import intro from '../../assets/videos/intro.mp4'
import { CgGoogle, CgYoutube } from "react-icons/cg";
import { SiCoursera, SiUdemy } from "react-icons/si";
import { FaAws } from "react-icons/fa6";

function Home() {
  return (
    <div className=' -mt-10'>
      <div className="lg:flex md:flex h-screen  min-w-full md:justify-between px-10 gap-10 items-center">
        <div className="md:text-end text-center lg:w-3/5 md:w-3/5 w-full items-center px-10 py-10">
          <div className="text-4xl my-2 font-bold">LEARN FROM THE EXPERTS</div>
          <div className="my-2">Find Valuable Content at Reasonable Price</div>
          <button className='my-2 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900 transition-all duration-100 ease-in-out delay-100'>Explore Now</button>
        </div>
        <div className='lg:w-2/5 md:w-3/5 flex justify-center items-center text-center'>
          <img className=" transition-all duration-100 ease-in-out drop-shadow-2xl " width={'80%'}  src={background} alt="background_image" />
        </div>
      </div>
      <div className='bg-[#27272a] text-center min-h-36'>
        <h1 className="text-yellow-500 text-2xl font-bold py-5">OUR BRANDS</h1>
        <div className="flex flex-wrap text-white text-4xl justify-evenly mt-2">
          <CgGoogle className='hover:text-yellow-500 cursor-pointer ' />
          <CgYoutube className='hover:text-yellow-500 cursor-pointer ' />
          <SiCoursera className='hover:text-yellow-500 cursor-pointer ' />
          <SiUdemy className='hover:text-yellow-500 cursor-pointer ' />
          <FaAws className='hover:text-yellow-500 cursor-pointer ' />
        </div>
      </div>
      <div className="flex justify-center items-center min-h-screen ">
        <video controls controlsList="nodownload noremoteplayback nofullscreen" disablePictureInPicture disableRemotePlayback={true} autoPlay={true} loop={true}  muted={true} src={intro} className='drop-shadow-2xl border-2 border-[#d0d0d8] rounded-md md:w-2/3 lg:w-2/3 w-full mx-5' />
      </div>
    </div>
  )
}

export default Home;