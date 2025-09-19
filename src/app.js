const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());
// Creating API
app.post("/signup", async (req, res) => {
  // Create new instance
  console.log(req.body);
   const user = new User(req.body);
  try {
     await user.save(); // data need to save to DB which return as promise
    res.send("User Created Successfully...");
    
  } catch (error) {
    res.status(500).send("Something Went Wrong!!")
  }
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
