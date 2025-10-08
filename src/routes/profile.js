
const express = require("express")
const profileRouter = express.Router()

const {userAuth} = require("../middlewares/auth");
const {validateEditProfile} = require("../Utilis/validation")

profileRouter.get("/profile/view",userAuth, async(req,res)=>{
  try {
    const user = req.user
    res.send(user)
  } catch (error) {
    throw new Error("ERROR :"+ error.message);   
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

