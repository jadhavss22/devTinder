const mongoose = require("mongoose")

const connectionRequestschema = new mongoose.Schema({
    fromRequest : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
     toRequest : {
        type : mongoose.Schema.Types.ObjectId,
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

// Create Model and export
module.exports = mongoose.model("ConnectionRequest",connectionRequestschema)