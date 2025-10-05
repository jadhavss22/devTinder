
const jwt = require('jsonwebtoken')


authAdmin = ("/admin", (req, res, next) => {
  const token = "asd";
  const adminAuthorised = token == "asd";
  if (!adminAuthorised) {
    res.status(401).send("Unauthorised Access!!");
  } else {
    next();
  }
});
const userAuth = ("/user", async(req,res,next)=>{
  try {
  // Reading token from cookies
  const {Token} = req.cookies
  if(!Token){
    throw new Error("Invalid Credentials!!");
    
  }
  //  Validate token
  const decodeMsg = await jwt.verify(Token,"Devtinder$987")
  //  Find the user
  const {_id} = decodeMsg
  const user = User.findById(_id)
  if(!user){
    throw new Error("User Does not Exist!!");
  }else{
    req.user = user
    next()
  }
  } catch (error) {
   res.status(400).send("ERROR: "+ error.message)
  }
})


module.exports ={
    authAdmin,
    userAuth
}