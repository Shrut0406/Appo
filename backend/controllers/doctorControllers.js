const doctorModel = require("../models/doctorModel");


const changeAvailability=async (req,res)=>{
    try {
        const {docId}=req.body;
        const docData=await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, {available: !docData.available});
        res.json({success:true, message:"Availability changed"})
    }   
    catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message});
    }
}
const doctorsList=async(req,res)=>{
    try {
        const doctors=await doctorModel.find({}).select(['-password','-email']);
        res.json({success:true, doctors:doctors});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}
module.exports={changeAvailability, doctorsList};