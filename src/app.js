const express = require("express");

const app = express();

const {authAdmin,userAuth } = require("./middlewares/auth")

app.use("/admin",authAdmin)
app.get("/user",userAuth,(req,res)=>{
  res.send("Authorized User Access!!")
})

app.get("/admin/getAllUser", (req, res) => {
  res.send("Data of All Users!!");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted User!!");
});

app.listen(8888, () => {
  console.log("Server is Connected to port!!");
});
