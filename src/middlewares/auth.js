
const authAdmin = ("/admin", (req, res, next) => {
  const token = "asd";
  const adminAuthorised = token == "asd";
  if (!adminAuthorised) {
    res.status(401).send("Unauthorised Access!!");
  } else {
    next();
  }
});
const userAuth = ("/user", (req,res,next)=>{
  const token = "xassrtyjtuj"
  const userAuthtoken = token == "xassrtyjtuj"
  if (!userAuthtoken) {
    res.status(401).send("Unauthorised Token")
  } else {
    next()
  }
})

module.exports ={
    authAdmin,
    userAuth
}