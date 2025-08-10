import React, { use } from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { ApppContext } from '../context/AppContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(ApppContext);
  const [doctor, setDoctor] = useState(null);
  const [doctorsSlots, setDocSlots] = useState([]);
  const [slotIdx, setSlotIdx] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']


  const fetchDoctor = async () => {
    const foundDoctor = doctors.find(doc => doc._id === docId);
    setDoctor(foundDoctor);
  }

  const getAvailableSlots = async () => {
    setDocSlots([]);

    // getting current date

    let today = new Date();
    for (let i = 0; i < 7; i++) {

      // getting date with index

      let currDate = new Date(today);
      currDate.setDate(today.getDate() + i);

      // setting end time of the date with index

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // setting hours

      if (today.getDate() === currDate.getDate()) {
        currDate.setHours(currDate.getHours() > 10 ? currDate.getHours() + 1 : 10);
        currDate.setMinutes(currDate.getMinutes() > 30 ? 30 : 0);
      }
      else {
        currDate.setHours(10);
        currDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currDate < endTime) {
        let formattedTime = currDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // add slot to array
        timeSlots.push({
          datetime: new Date(currDate),
          time: formattedTime
        });

        // incrementing 30 minutes
        currDate.setMinutes(currDate.getMinutes() + 30);
      }
      setDocSlots(prev => ([...prev, timeSlots]))

    }
  }

  useEffect(() => {
    fetchDoctor();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [doctor]);

  useEffect(() => {
    // console.log(doctorsSlots);
  }, [doctorsSlots]);

  return doctor && (
    <div>
      {/* Doctors details */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-[#5f6FFF] w-full sm:max-w-72 rounded-lg' src={doctor.image} alt="" />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/*Pesronal Info*/}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {doctor?.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{doctor.degree} - {doctor.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{doctor.experience}</button>
          </div>

          {/*About*/}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{doctor.about}</p>
          </div>

          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee: <span className='text-gray-600'>{currencySymbol}{doctor.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking slots */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            doctorsSlots.length && doctorsSlots.map((item, index) => (
              <div onClick={() => setSlotIdx(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIdx === index ? 'bg-[#5f6FFF] text-white' : 'border border-gray-200'}`} key={index}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>


        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {doctorsSlots.length && doctorsSlots[slotIdx].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-[#5f6FFF] text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button className='bg-[#5f6FFF] text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer hover:scale-105 transition-all duration-500'>Book an appointment</button>
      </div>
      {/* Related Doctors */}

      {/* <RelatedDoctors /> */}
      <RelatedDoctors docId={docId} speciality={doctor.speciality} />

    </div>
  )
}

export default Appointment