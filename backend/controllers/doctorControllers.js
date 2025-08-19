const doctorModel = require("../models/doctorModel");
const appointmentModel = require('../models/appointmentModel');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;
        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
        res.json({ success: true, message: "Availability changed" })
    }
    catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
//
const doctorsList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email']);
        res.json({ success: true, doctors: doctors });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// API for doctor login

const doctorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({ email });
        if (!doctor) {
            return res.json({ success: false, message: 'Invalid credential' })
        }
        const isMatch = bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid credential' })
        }
        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
        return res.json({ success: true, token });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// API to get doctor appointment

const doctorAppointment = async (req, res) => {
    try {
        const { doctorId } = req.body;
        const appointments = await appointmentModel.find({ doctorId });
        return res.json({ success: true, appointments });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// API to mark appointment completed

const completeAppointment = async (req, res) => {

    try {
        const { doctorId, appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.doctorId === doctorId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });

            return res.json({ success: true, message: 'Appointment completed' });
        }
        else {
            res.json({ success: false, message: 'Invalid access' });
        }

    } catch (error) {
        return res.json({ success: false, message: error.message });

    }
}
// API to cancel appointment 

const cancelAppointment = async (req, res) => {

    try {
        const { doctorId, appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.doctorId === doctorId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancel: true });

            return res.json({ success: true, message: 'Appointment cancelled' });
        }
        else {
            res.json({ success: false, message: 'Invalid access' });
        }

    } catch (error) {
        return res.json({ success: false, message: error.message });

    }
}

// API to get dashboard data 

const dashboardData = async (req, res) => {
    try {
        const { doctorId } = req.body;
        const appointmentData = await appointmentModel.find({ doctorId });
        let earning = 0;
        let patients = [];
        appointmentData.map((item) => {
            if (item.isCompleted || item.payment) {
                earning += item.amount;
            }
            if (!patients.includes(item.userId)) {
                patients.push(item.userId);
            }
        })

        const dashData = {
            earning,
            appointments: appointmentData.length,
            patients: patients.length,
            latestAppointments: appointmentData.reverse().slice(0, 5)
        }
        res.json({ success: true, dashData });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// API to get doctors profile data
const getDoctorsData = async (req, res) => {
    try {
        const { doctorId } = req.body;
        const profileData = await doctorModel.findById(doctorId).select('-password');

        return res.json({ success: true, profileData })

    } catch (error) {
        return res.json({ success: false, message: error.message });

    }
}

const updateProfile = async (req, res) => {
    try {
        const { doctorId, fees, address, available } = req.body;

        await doctorModel.findByIdAndUpdate(doctorId, { fees, address, available });

        return res.json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        return res.json({ success: false, message: error.message });

    }
}

module.exports = { getDoctorsData, updateProfile, dashboardData, changeAvailability, doctorsList, doctorLogin, doctorAppointment, completeAppointment, cancelAppointment };
