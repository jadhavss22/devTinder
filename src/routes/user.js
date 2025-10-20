const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user")
// GET all pending request for loggedIn user
userRouter.get("/user/requests", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { status: "interested", toUserId: loggedInUser._id },
        { fromUserId: loggedInUser, status: "interested" },
      ],
    }).populate("fromUserId", "firstName lastName");
    res.json({
      message: "Data Fetch Successfully",
      data: connectionRequest,
    });
  } catch (error) {
    console.log("ERROR :" + error.message);
  }
});



// GET list of all users have connections with user
userRouter.get("/user/connections", userAuth, async (req, res) => {
  const loggedInUser = req.user;

  const connectionRequest = await ConnectionRequest.find({
    $or: [
      { fromUserId: loggedInUser._id, status: "accepted" },
      { toUserId: loggedInUser._id, status: "accepted" },
    ],
  })
    .populate("fromUserId", "firstName lastName")
    .populate("toUserId", "firstName lastName");
  const data = connectionRequest.map((row) => {
    if (row.fromUserId._id.toString() == loggedInUser._id.toString()) {
      return row.toUserId;
    }
    return row.fromUserId;
  });

  res.json({ data });
});


// GET list of all users make new connections
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page= parseInt(req.query.page)
    let limit= parseInt(req.query.limit)
     limit = limit > 50 ? 50 : limit
     const skip = (page-1)*limit
// GET all the connection requests (sent + receive)
    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    })
  .select("fromUserId toUserId")
  .populate("fromUserId", "firstName lastName")
  .populate("toUserId", "firstName lastName");
   
  const hideUserFromFeed = new Set()    // I want unique id's only no duplicates
  connectionRequest.forEach((req)=>{
    hideUserFromFeed.add(req.fromUserId.toString())
    hideUserFromFeed.add(req.toUserId.toString())
  }) 
// I want users other than me and connection request send/receive by users
  const users = await User.find({
    $and :[
      {_id : {$ne : loggedInUser._id}},
      {_id : {$nin : Array.from(hideUserFromFeed)}}
    ]
  }).select("firstName lastName").skip(skip).limit(limit)

      res.json({data: users})
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

module.exports = userRouter;
