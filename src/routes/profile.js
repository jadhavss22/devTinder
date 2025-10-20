
const express = require("express")
const profileRouter = express.Router()
const {userAuth} = require("../middlewares/auth");
const {validateEditProfile} = require("../Utilis/validation")
const User = require("../models/user")


profileRouter.get("/profile/view",userAuth, async(req,res)=>{
  const userEmail = req.query.emailId; 
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) return res.status(404).send("User not found");
    res.status(200).json(user);
  } catch (error) {
    throw new Error("ERROR :"+error.message);
    
  }
  })

profileRouter.post("/profile/edit", userAuth, async (req,res) => {
    try {
      if (!validateEditProfile(req)) {
        throw new Error("Invalid Edit Request!!");
        // Edit our loggedIn user fields
      }  
        const loggedInUser = req.body
        Object.keys(req.body).forEach((key)=> (loggedInUser[key]=req.body[key]))
    await loggedInUser.save()
      
    } catch (error) {
      throw new Error("");
      
    }
  })


  module.exports = profileRouter

