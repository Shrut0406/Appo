const express = require('express');
const cors=require('cors');
require('dotenv').config();
const connectDB = require('./config/mongoDB');
const connectCloudinary = require('./config/cloudinary');
const adminRouter = require('./routes/adminRoutes');
const doctorRouter = require('./routes/doctorRoute');
const userRouter = require('./routes/userRoutes');


const app= express();

const port= process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

connectDB();
connectCloudinary();


// API endpoints

app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

