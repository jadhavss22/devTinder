
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName :{
        type : String
    },
    lastName :{
        type : String
    },
    emailId:{
        type : String
    },
    gender:{
        type : String
    },
    age:{
        type : Number
    },
    password : {
        type : String
    }
})

// Create Model

module.exports = mongoose.model("User",userSchema)