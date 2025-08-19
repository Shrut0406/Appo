const express=require("express");
const { doctorsList, doctorLogin, doctorAppointment, completeAppointment, cancelAppointment, dashboardData, getDoctorsData, updateProfile } = require("../controllers/doctorControllers");
const authDoctor = require("../middleware/authDoctor");


const doctorRouter=express.Router();
doctorRouter.get('/list',doctorsList)
doctorRouter.post('/login',doctorLogin)
doctorRouter.post('/doctor-appointment',authDoctor,doctorAppointment);
doctorRouter.post('/complete-appointment', authDoctor,completeAppointment);
doctorRouter.post('/cancel-appointment', authDoctor,cancelAppointment);
doctorRouter.post('/dashboard',authDoctor,dashboardData);
doctorRouter.post('/profile',authDoctor,getDoctorsData);
doctorRouter.post('/update-profile',authDoctor,updateProfile);



module.exports=doctorRouter