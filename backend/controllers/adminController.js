const validator = require('validator');
const bcrypt= require('bcrypt');
const cloudinary=require("cloudinary").v2;
const doctorModel = require('../models/doctorModel');
const jwt=require('jsonwebtoken');
// API call to add a new doctor

const addDoctor= async(req,res)=>{
    try{
        const { name, email, password, speciality, degree, experience, about, available, fees, address } = req.body;
        const imageFile = req.file;
        // console.log({ name, email, password, speciality, degree, experience, about, available, fees, address },imageFile);

        // check if all required fields are provided
        if (!name || !email || !password || !speciality || !degree || !experience || !about  || !fees || !address || !imageFile) {
            return res.json({success:false, message: 'Please provide all required fields.' });
        }

        // validate email format
        if (!validator.isEmail(email)) {
            return res.json({success:false, message: 'Invalid email format.' });
        }

        // validate password strength
        if(password.length < 8) {
            return res.json({success:false, message: 'Password must be at least 6 characters long.' });
        }

        // hash the password
        const SALT=await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, SALT);

        // upload the image to Cloudinary
        const imageUpload= await cloudinary.uploader.upload(imageFile.path, {
            resource_type: 'image'
        });
        const imageUrl = imageUpload.secure_url;
        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            available,
            fees,
            address:JSON.parse(address),
            image: imageUrl,
            date: Date.now()
        };
        // save the doctor data to the database

        const newDoctor= new doctorModel(doctorData);
        await newDoctor.save();
        res.json({success:true, message: 'Doctor added successfully' });

    }
    catch(error){
        console.error("Error adding doctor:", error);
        res.json({ success:false, message: 'Internal server error', error: error.message });
    }
}

// API for Admin

const loginAdmin = async (req, res) => {

    try {
        const { email, password } = req.body;
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            return res.json({success:true, message: 'Login successful', token });
        }
        else {
            return res.json({success:false, message: 'Invalid email or password' });
        }
    } 
    catch (error) {
        console.error("Error logging in admin:", error);
        res.json({success:false, message: 'Internal server error', error: error.message });
    }
}

// API to fetch data from backend

const fetchData = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password');
        res.json({success:true, doctors: doctors });
    } 
    catch (error) {
        res.json({success:false, message: error.message });
    }
}



module.exports = {addDoctor, loginAdmin,fetchData};