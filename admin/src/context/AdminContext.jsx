import React, { createContext, useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify"
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  const [DoctorsList, setDoctorList] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false)
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/doctor-list', { headers: { aToken } });
      if (data.success) {
        // console.log(data.doctors);
        setDoctorList(data.doctors);
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { aToken } });
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

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { aToken } });
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
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
      const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { aToken } });
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const getDashboarData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } });
      if (data.success) {
        setDashData(data.dashData)
      }
      else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const value = {
    aToken,
    setAToken,
    backendUrl,
    DoctorsList,
    getAllDoctors,
    changeAvailability,
    appointments, setAppointments,
    getAllAppointments,
    cancelAppointment,
    dashData,getDashboarData
  }

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider;