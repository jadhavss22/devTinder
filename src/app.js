const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res,next) => {
    console.log("Handelling routes!!");
    res.send("Response!!");
    next()
  },
  (req,res,next) => {
    console.log("Handlling user2 route!! ");
     res.send("2nd Response!!");
     next()
  },
  (req,res)=>{
    console.log("Handelling 3rd Route User!!");
    res.send("3rd Response!!")
  }
);

app.listen(8888, () => {
  console.log("Server is Connected to port!!");
});
