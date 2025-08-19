import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ApppContext } from '../context/AppContext.jsx'

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } =useContext(ApppContext);
  return (


    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctors</h1>


        <p className='sm:w-1/3 text-center text-sm'>Here you can find a list of top doctors based on various specialities.</p>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0 cursor-pointer'>
            {
                doctors.slice(0,10 ).map((item,index)=>(
                   <div onClick={()=>navigate(`/appointment/${item._id}`)}  key={index} className='border border-blue-200 rounded-xl overflow-hidden hover:translate-y-[-10px] transition-all duration-500 '>
                        <img className='bg-blue-50' src={item.image} alt="" />
                        <div className='p-4'>
                            <div className={`flex items-center gap-2 text-sm ${item.available? ' text-green-500': 'text-gray-500' } text-center`}>
                                <p className= {` w-2 h-2 rounded-full ${item.available? ' bg-green-500': 'bg-gray-500' }`}></p><p>{ item.available? 'Available': "Not Available"}</p>
                            </div>
                            <p className='text-gray-900 font-medium text-lg '>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>
                   </div>
                ))
            }
        </div>
        <button onClick={()=> {navigate('/doctor'); scrollTo(0,0);}} className= ' bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 cursor-pointer '>Show More</button>
    </div>
  )
}

export default TopDoctors