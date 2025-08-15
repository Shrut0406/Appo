const express=require("express");
const {registerUser, userLogin, getProfile, updateProfile}=require("../controllers/useControllers");
const authUser = require("../middleware/authUser");
const upload =require('../middleware/multer');
const userRouter=express.Router();
userRouter.post('/register',registerUser)
userRouter.post('/login',userLogin)
userRouter.post('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)

module.exports=userRouter