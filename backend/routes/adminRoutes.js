const express = require('express');

const {addDoctor, loginAdmin,fetchData, appointmentAdmin, cancelAppointmentByAdmin, getDashboardData} = require('../controllers/adminController');
const upload = require('../middleware/multer');
const authAdmin = require('../middleware/authAdmin');
const { changeAvailability } = require('../controllers/doctorControllers');


const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.get('/doctor-list',authAdmin, fetchData);
adminRouter.post('/change-availability',authAdmin,changeAvailability);
adminRouter.get('/appointments',authAdmin,appointmentAdmin);
adminRouter.post('/cancel-appointment',authAdmin,cancelAppointmentByAdmin);
adminRouter.get('/dashboard',authAdmin,getDashboardData);

module.exports = adminRouter;


