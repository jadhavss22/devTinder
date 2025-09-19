//import mongoose
const mongoose = require("mongoose");

//Connect mongoose to cluster and mongoose.connect method
//  returns promise so we use async/await. 
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://nodeDev:2GDObispV6pIVElT@nodedev.e94b1hh.mongodb.net/test"
  );
};

module.exports = connectDB
