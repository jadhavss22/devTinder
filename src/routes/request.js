const express = require("express")
const {userAuth} = require("../middlewares/auth")
const requestRouter = express.Router()
const ConnectionRequest = require("../models/connectionRequest")


requestRouter.post("/requestSend/:status/:toUserId",userAuth, async (req,res) => {
    try {
       const fromUserId = req.user._id
       const toUserId = req.params.toUserId 
       const status = req.params.status

       const toUser = ConnectionRequest.findById(toUserId)
       if(!toUser){
        res.status(400).send("User Does not Exist!!!")
       }
       // To Save connectionRequest
     const  connectionRequestData = new ConnectionRequest({
        fromUserId,toUserId,status
     })

     const data = await connectionRequestData.save()

     res.json({message : req.user.firstName+req.user.lastname  + status + "in" + toUser.firstName+toUser.lastname,data})
    } catch (error) {
        throw new Error("ERROR:"+error.message);
        
    }
})

module.exports = requestRouter