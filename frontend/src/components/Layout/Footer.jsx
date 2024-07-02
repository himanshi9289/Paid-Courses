import React from 'react'
import { TiSocialYoutubeCircular,TiSocialInstagramCircular,TiSocialGithubCircular } from "react-icons/ti";

function Footer() {
  return (
    <div className='flex bottom-0 w-full bg-[#27272a] justify-between px-5 text-white items-center py-5'>
      <div className="">
        <h1 className="text-2xl font-bold">All Rights Reserved</h1>
        <p className='text-yellow-500'>@paidCourse</p>
      </div>
      <div className="flex justify-between text-2xl md:text-5xl md:min-w-56 ">
        <TiSocialYoutubeCircular  className='hover:text-yellow-500 cursor-pointer'  />
        <TiSocialInstagramCircular  className='hover:text-yellow-500 cursor-pointer' />
        <TiSocialGithubCircular  className='hover:text-yellow-500 cursor-pointer' />
      </div>
    </div>
  )
}

export default Footer
