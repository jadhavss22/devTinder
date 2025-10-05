
const express = require("express")
const userRouter = express.Router()
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const { signupValidation } = require("../Utilis/validation");
const cookieParser = require("cookie-parser")
const {userAuth} = require("../middlewares/auth");

app.use(express.json());
app.use(cookieParser())

userRouter.post("/signup", async (req, res) => {
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


userRouter.post("/login",userAuth, async(req,res)=>{
  try{
  const {emailId, password} = req.body
  const user = await User.findOne({emailId:emailId})
  
  if(!user){
    throw new Error("Invalid Credential!!");
  }
  const isPasswordValid =  await user.validatePwd(password)
  if (isPasswordValid) {
      // Create JWT Token
  const Token = await user.getJWT()
  res.cookie("Token",Token,{expires: new Date(Date.now() + 3 * 60 * 1000)})
  res.send("Login Successful...")
  }else{
    throw new Error("Invalid Credentials!!");
  }
}catch(err){
    throw new Error("ERROR :"+err.message);
  }
})

userRouter.post("/logout", async (req,res)=> {
  res.cookie("Token",null,{expires : new Date(Date.now())}).send("User Logout Successfully.....")
})

module.exports = userRouter