const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser")
const userRouter= require("./routes/user")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request");
const authRouter = require("./routes/auth");
const app = express();
const cors = require('cors')

app.use(cors({
  origin : "http://localhost:5173",
  credentials : true
}
))
app.use(cookieParser())
app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)

// Fetching All Users API
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send("Something Went Wrong!!");
  }
});

// Updating Users API
app.post("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["age", "gender", "skills", "photoUrl"];
    const isAllowedUpdates = Object.keys(data).every((k) => {
      ALLOWED_UPDATES.includes(k);
    });
    if (!isAllowedUpdates) {
      throw new Error("Update Not Allowed!!");
    }

    if (data?.skills.length > 8) {
      throw new Error("Skills can't be more than 8");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    res.send("User Updated Successfully...");
  } catch (error) {
    res.status(400).send("Update Failed : " + error.message);
  }
});

// Deleting Users API
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.send(user);
  } catch (error) {
    res.status(500).send("Something Went Wrong!!");
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
