const express=require("express");
const { doctorsList } = require("../controllers/doctorControllers");


const doctorRouter=express.Router();
doctorRouter.get('/list',doctorsList)

module.exports=doctorRouter