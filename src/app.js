const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const { signupValidation } = require("./Utilis/validation");

app.use(express.json());

// Creating Signup API
app.post("/signup", async (req, res) => {
  try {
    // Validation of the user
    signupValidation(req);

    const { firstName,lastName,emailId,password } = req.body;
    // Encypt password
    const pwdHash = await bcrypt.hash(password, 8);

    // Create new instance
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: pwdHash,
    });

    await user.save(); // data need to save to DB which return as promise
    res.send("User Created Successfully...");
  } catch (error) {
    res.status(500).send("ERROR : " + error.message);
  }
});

app.post("/login", async(req,res)=>{
  try{
  const {emailId, password} = req.body

  const user = await User.findOne({emailId:emailId})
  if(!user){
    throw new Error("Invalid Credential!!");
  }
  const isPasswordValid = await bcrypt.compare(password,user.password)
  if (isPasswordValid) {
    res.send("Login Successful...")
  } else {
    throw new Error("Invalid Credentials!!");
    
  }
}catch(err){
throw new Error("ERROR :"+err.message);

}
})

// Fetching Single User API
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.find({});
    if (users.length == 0) {
      res.status(400).send("Invalid emailId!!");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(500).send("Something Went Wrong!!");
  }
});

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
