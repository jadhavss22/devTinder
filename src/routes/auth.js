
const express = require("express")
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { signupValidation } = require("../Utilis/validation");
const authRouter = express.Router()

authRouter.use(express.json())

authRouter.post("/signup", async (req, res) => {
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


authRouter.post("/login", async(req,res)=>{
  try{
    console.log("req.body",req.body);
    
  const {emailId, password} = req.body
  const user = await User.findOne({emailId:emailId})
  
  if(!user){
    throw new Error("Invalid Credential!!");
  }
  const isPasswordValid =  await user.validatePwd(password)
  if (isPasswordValid) {
      // Create JWT Token
  const token = await user.getJWT()
  console.log("token2",token);
  
  res.cookie("token",token,{expires: new Date(Date.now() + 3 * 60 * 1000)})
  res.send("Login Successful...")
  }else{
    throw new Error("Invalid Credentials!!");
  }
}catch(err){
    throw new Error("ERROR :"+err.message);
  }
})

authRouter.post("/logout", async (req,res)=> {
  res.cookie("token",null,{expires : new Date(Date.now())}).send("User Logout Successfully.....")
})

// Pending to write Forget password API

module.exports = authRouter