import React, { useState } from 'react'
import { createContext } from "react";
import axios from "axios"
import { toast } from "react-toastify"

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : false);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [docData,setDocData] =useState(false);

  const getAppointments = async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/doctor/doctor-appointment', {}, { headers: { dToken } });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const getProfileData=async()=>{
    try {
      const { data } = await axios.post(backendUrl + '/api/doctor/profile', {}, { headers: { dToken } });
      if (data.success) {
        setDocData(data.profileData);
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  const markComplete = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/doctor/complete-appointment', { appointmentId }, { headers: { dToken } });
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { dToken } });
      if (data.success) {
        toast.success(data.message);
        getAppointments();
        getDashboardData();
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const getDashboardData = async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/doctor/dashboard', {  }, { headers: { dToken } });
      if (data.success) {
        toast.success(data.message);
        setDashData(data.dashData);
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      
    }
  }

  const value = {
    dToken, setDToken,
    backendUrl,
    appointments, getAppointments,
    markComplete,
    cancelAppointment,
    dashData,
    getDashboardData,
    docData,getProfileData,
    setDocData
  }

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  )
}
export default DoctorContextProvider;