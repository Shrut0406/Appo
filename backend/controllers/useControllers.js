
const validator = require("validator")
const bcrypt = require("bcrypt")
require('dotenv').config();
const userModel = require('../models/userModels')
const jwt = require("jsonwebtoken")
const cloudinary = require('cloudinary').v2;
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing fields" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: 'Password must be at least 8 characters long.' });
        }

        const SALT = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, SALT);


        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)

        return res.json({ success: true, token });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        return res.json({ success: true, token })


    } catch (error) {
        return res.json({ success: false, message: error.message });

    }
}


// get profile
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId).select('-password')
        res.json({ success: true, user });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

const updateProfile = async (req, res) => {
    try {

        const { userId, name, phone, address, dateOfBirth, gender } = req.body;
        const imageFile = req.file;

        if (!name || !phone || !dateOfBirth || !gender) {
            return res.json({ success: false, message: "missing field" });
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dateOfBirth, gender })

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageUrl = imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId, { image: imageUrl });
        }
        res.json({ success: true, message: "Profile updated" });

    } catch (error) {
        return res.json({ success: false, message: error.message });

    }
}

// API to add appointment

const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;
        const docData = await doctorModel.findById(docId).select('-password');

        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor Not available' });
        }

        let slot_booked = doctorModel.slot_booked;

        if (slot_booked[slotDate]) {
            if (slot_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot Not available' });
            }
            else {
                slot_booked[slotDate].push(slotTime);
            }
        }
        else {
            slot_booked[slotDate] = [];
            slot_booked[slotDate].push(slotTime);
        }
        const userData = await userModel.findById(userId).select('-password');

        delete docData.slot_booked;

        const appointmentData={
            userId,
            docId,
            slotDate,
            slotTime,
            userData,
            docData,
            amount:docData.fees,
            date: Date.now()

        }

        const newAppointment=new appointmentModel(appointmentData);

        await newAppointment.save();
        await doctorModel.findByIdAndUpdate(docId,{slot_booked});

        return res.json({success:true, message: "Appointment booked"})

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

module.exports = { registerUser, userLogin, getProfile, updateProfile,bookAppointment }