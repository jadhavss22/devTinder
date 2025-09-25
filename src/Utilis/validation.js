const validator = require("validator")

const signupValidation = (req)=>{
const {firstName,lastName,emailId,password} = req.body
if(!firstName || !lastName){
    throw new Error("Enter a valid name!!");
    
}
else if (!validator.isEmail(emailId)) {
    throw new Error("Enter a Valid emsilId!!");
    
}else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a Strong Password!!");
    
}
}
module.exports = {
    signupValidation
}