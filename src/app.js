const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

// Creating API
app.post("/signup", async(req, res) => {
  // Create new instance
  console.log("user",User);
  
  const user = new User({
    firstName: "Christiano",
    lastName: "Ronaldo",
    emailId: "cr@7.com",
    password: "Christiano@07",
  });

  await user.save(); // data need to save to DB return promise
  res.send("User Created Successfully...");
});


connectDB()
  .then(() => {
    console.log("Established DB Connection Successfully...");
    app.listen(8888, () => {
      console.log("Server is Connected to port 8888...");
    });
  })
  .catch((err) => {
    console.error("Failed to connect DB!!");
  });
