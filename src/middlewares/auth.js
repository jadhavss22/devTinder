
const jwt = require('jsonwebtoken')
const User = require("../models/user");

const userAuth =  async(req,res,next)=>{
  try {
  // Reading token from cookies
  const {token} = req.cookies
  console.log("token1",token);
  
  if(!token){
    throw new Error("Invalid Credentials!!");
    
  }
  //  Validate token
  const decodeMsg = await jwt.verify(token,"Devtinder$987")
  console.log("decodeMsg",decodeMsg);
  
  //  Find the user
  const {_id} = decodeMsg
  const user = await User.findById(_id)
  if(!user){
    throw new Error("User Does not Exist!!");
  }else{
    req.user = user
    next()
  }
  } catch (error) {
   res.status(400).send("ERROR: "+ error.message)
  }
}


module.exports ={
    userAuth
}