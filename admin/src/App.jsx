import React, { useContext } from 'react'
import Login from './pages/login'
import { ToastContainer, toast } from 'react-toastify'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes,Route } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard'
import AddDoctor from './pages/Admin/AddDoctor'
import AllAppointments from './pages/Admin/AllAppointments'
import DoctorsList from './pages/Admin/DoctorsList'
const App = () => {
  const { aToken } = useContext(AdminContext);
  // console.log(aToken);
  return aToken ? (
    <div className='bg-[#F8F9FD]'>
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard/>} />
          <Route path='/all-appointments' element={<AllAppointments/>} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/doctor-list' element={<DoctorsList/>}/>
        </Routes>
      </div>
      <ToastContainer />
    </div>
  ) :
    (
      <div >
        <Login />
        <ToastContainer />
      </div>
    )
}

export default App