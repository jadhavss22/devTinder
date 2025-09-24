const mongoose = require("mongoose");

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
    default: "This is the default field",
    min: 18,
    max : 60
  },
  password: {
    type: String,
    minLength : 6,
    maxLength : 20,
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

// Create Model

module.exports = mongoose.model("User", userSchema);
