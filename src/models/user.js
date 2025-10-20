const mongoose = require("mongoose");
const validator = require("validator")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    maxLength : 20,
    required : true,
    minLength : 4
  },
  lastName: {
    type: String,
    maxLength : 20,
    minLength:4
  },
  emailId: {
    type: String,
    required :true ,
    maxLength :30 ,
    minLength : 8,
    lowercase: true,
    trim: true,
    unique: true,
    validate(value){
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email Id :"+ value);
        
      }
    }
// match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
  },
  gender: {
    type: String,
    validate(value) {
      if (!["Male", "Female", "Others"].includes(value)) {
        throw new Error("Gender Data is not valid!!");
      }
    },
  },
  age: {
    type: Number,
   // default: "This is the default field",
    min: 18,
    max : 60
  },
  password: {
    type: String,
    required : true,
    validate(value){
// match :[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,"At least one uppercase, one lowercase, one digit, one special char"]
if (!validator.isStrongPassword(value)) {
  throw new Error("Enter a Strong Password :"+ value);
}
    }
  },
  photoUrl: {
    type: String,
  },
  skills: [
    {
      type: String,
      maxLength : 15
    },
  ],
},
{
  timestamps : true
}

);

userSchema.methods.getJWT = async function () {

  const user = this
  const token = await jwt.sign({_id : user._id},"Devtinder$987")

  return token
}
userSchema.methods.validatePwd = async function(pwdInputByUser) {
  const user = this
  const passwordHash = user.password

  const isPasswordValid = await bcrypt.compare(pwdInputByUser,passwordHash)
  return isPasswordValid
}

// Create Model
module.exports = mongoose.model("User", userSchema); // User is my model name
