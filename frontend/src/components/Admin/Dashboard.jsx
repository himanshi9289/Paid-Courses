import React from 'react'
import Sidebar from './Sidebar'
import { FaArrowUp,FaArrowDown } from "react-icons/fa";
import { DoughnutChart,LineChart } from './Chart.jsx';

function Dashboard() {

  let datetime = new Date();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = daysOfWeek[datetime.getDay()];
  const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 
    'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
  const month = months[datetime.getMonth()];
  const date = datetime.getDate();
  const year = datetime.getFullYear();
  const time = datetime.getHours()+':'+datetime.getMinutes()+":"+datetime.getSeconds();

  return (
    <div className='flex justify-between md:ml-16 md:overflow-hidden overflow-scroll'>
      <div className="w-5/6 mt-16">
            <p className="text-center">Last Change was on {day+" "+month +" " +date + " " + year + " "+ time}</p>
            <div className="flex flex-wrap justify-evenly my-10">
              <View text={'Views'} noOfusers={222} percent={30} isGain={true}/>
              <View text={'Users'} noOfusers={23} percent={56} isGain={true}/>
              <View text={'Subscription'} noOfusers={16} percent={5} isGain={false}/>
            </div>

            {/*  */}
            <div className='p-5 border-2 rounded-lg shadow-md'>
              <p className="text-xl font-semibold text-center my-1">Views graph</p>
              <LineChart views={[1,2,3,4]}/>
            </div>
            <div className="flex flex-wrap justify-evenly px-4 gap-2 items-center my-10 space-y-10  ">
              <div className="md:w-1/2 w-full space-y-4">
                <p className="text-xl font-semibold">Progress Bar</p>
                <div className="space-y-2">
                  <Bar title={'Views'} percent={30}/>
                  <Bar title={'Users'} percent={56}/>
                  <Bar title={'Subscription'} percent={5}/>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xl font-semibold">Users</p>
                <DoughnutChart users={[1,2]}/>
              </div>
            </div>
      </div>
      <Sidebar/>
    </div>
  )
}

export default Dashboard

export const Bar = ({title,percent}) => {
  return(
    <>
      <p className="text-md font-semibold">{title}</p>
      <div className="flex items-center justify-center gap-2">
        0%  
        <p className='w-full h-2 bg-[#3333333c] overflow-hidden p-0'><hr width={percent+'%'} className='h-3 border-0 bg-purple-600 ' /></p>
        100%
      </div>
    </>
  )
}


export const View = ({text,noOfusers,percent,isGain}) => {
  return(
    <div className=" w-72 p-5 border-2 rounded-lg shadow-md my-5">
      <h1 className="text-[#3b3a3a] font-semibold">{text}</h1>
      <div className="flex gap-4 items-center my-2">
        <p className="font-bold text-xl">{noOfusers}</p>
        <p className="">{percent}%</p>
        {
          isGain ? <FaArrowUp className='text-green-500 text-lg' /> : <FaArrowDown className='text-red-500 text-lg' />
        }
      </div>
      <p className="text-sm text-[#1b1a1a92]">Since Last Month</p>
    </div>
  )
}