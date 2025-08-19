import React, { use, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ApppContext } from '../context/AppContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Doctor = () => {
  const { speciality } = useParams();
  // console.log(speciality);
  const { doctors } = useContext(ApppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }
    else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()

  }, [doctors, speciality])

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row item-start gap-5 mt-5'>

        <button className={`w-1/3 py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filter</button>

        <div className={` flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => speciality === 'General physician' ? navigate('/doctor') : navigate('/doctor/General physician')} className={`w-[94vw] sm:w-auto pl-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}>General physician</p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctor') : navigate('/doctor/Gynecologist')} className={`w-[94vw] sm:w-auto pl-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctor') : navigate('/doctor/Dermatologist')} className={`w-[94vw] sm:w-auto pl-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>
          <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctor') : navigate('/doctor/Pediatricians')} className={`w-[94vw] sm:w-auto pl-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}>Pediatricians</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctor') : navigate('/doctor/Neurologist')} className={`w-[94vw] sm:w-auto pl-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctor') : navigate('/doctor/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}>Gastroenterologist</p>
        </div>

        <div className='w-full grid md:grid-cols-5 grid-cols-1 gap-4 gap-y-6'>
          {
            filterDoc.map((item, index) => (
              <div onClick={() => navigate(`/appointment/${item._id}`)} key={index} className='border border-blue-200 rounded-xl overflow-hidden hover:translate-y-[-10px] cursor-pointer transition-all duration-500 '>
                <img className='bg-blue-50' src={item.image} alt="" />
                <div className='p-4'>
                  <div className={`flex items-center gap-2 text-sm ${item.available ? ' text-green-500' : 'text-gray-500'} text-center`}>
                    <p className={` w-2 h-2 rounded-full ${item.available ? ' bg-green-500' : 'bg-gray-500'}`}></p><p>{item.available ? 'Available' : "Not Available"}</p>
                  </div>
                  <p className='text-gray-900 font-medium text-lg '>{item.name}</p>
                  <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>

      </div>

    </div>
  )
}

export default Doctor
