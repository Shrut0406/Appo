import React, { useContext } from 'react'
import Login from './pages/login'
import { ToastContainer, toast } from 'react-toastify'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
const App = () => {
  const {aToken}=useContext(AdminContext);
  console.log(aToken);
  return aToken? (
    <div className='bg-[#F8F9FD]'>
      <Navbar/>
      <ToastContainer/>
    </div>
  ):
  (
    <div >
      <Login />
      <ToastContainer />
    </div>
  )
}

export default App