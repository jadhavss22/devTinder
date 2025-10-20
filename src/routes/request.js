const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/requestSend/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid Status Type:" + status);
      }

      // If user send connection request to others and that users are present in DB then validate
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        res.status(400).send("User Does not Exist!!!");
      }

      // If connection request send by userA to userB or viceversa exist in DB then validate
      const existingConnection = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnection) {
        res.status(400).send("Connection Request Already Exist!!!");
      }

      // To Save connectionRequest
      const connectionRequestData = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      
      const data = await connectionRequestData.save();
console.log("dta",data)
      res.json({
        message:
          req.user.firstName +
          req.user.lastname +
          status +
          "in" +
          toUser.firstName +
          toUser.lastname,
        data,
      });
    } catch (error) {
      throw new Error("ERROR:" + error.message);
    }
  }
);

// requestId nothing but objectId(_id) present in connectionRequest schema
requestRouter.post(
  "/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        res.status(400).json({ message: "Status Type not allowed!!!" });
      }
      const acceptRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!acceptRequest) {
        res.status(400).json({
          message: "Connection Request does not exist!!!",
        });
      }
      acceptRequest.status = status;
      const data = await acceptRequest.save();
      res.json({ message: "Connection Request " + status, data });
    } catch (error) {
      throw new Error("ERROR MESSAGE :" + error.message);
    }
  }
);

module.exports = requestRouter;
