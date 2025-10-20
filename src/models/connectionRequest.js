const mongoose = require("mongoose")

const connectionRequestschema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
     toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User", 
         required : true
    },
    status : {
        type : String,
         required : true,
        enum : {
            values :['igonre','interested','accepted','rejected'],
            message : '{VALUE} is incorrect for the status type'
        }
    }
},{timestamps : true})
 
connectionRequestschema.index({fromUserId:1, toUserId:1}) // Compound Index

connectionRequestschema.pre("save",function (next) {
    // Get particular instance of collection
    const connectionRequest = this
    
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Can't Send Connection Request to yourself !!!");
    }
    next()
})

// Create Model name as ConnectionRequest and export
module.exports = mongoose.model("ConnectionRequest",connectionRequestschema)