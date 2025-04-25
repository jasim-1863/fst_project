const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' }); // Explicitly specify the path

console.log('MONGO_URI:', process.env.MONGO_URI); // Add this line for debugging


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB; 