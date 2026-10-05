const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // 3. இது .env ஃபைலில் உள்ள MONGO_URI-ஐ எடுத்து MongoDB உடன் இணைக்கும்
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;