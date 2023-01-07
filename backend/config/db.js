const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://wmoody:app@assessment-app.eb6lgyv.mongodb.net/?retryWrites=true&w=majority'
    );
    console.log(`MongoDB Connected!`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
