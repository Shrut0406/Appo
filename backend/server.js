const express = require('express');
const cors=require('cors');
require('dotenv').config();
const connectDB = require('./config/mongoDB');
const connectCloudinary = require('./config/cloudinary');


const app= express();

const port= process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

connectDB();
connectCloudinary();
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

