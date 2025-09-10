const express = require("express")

const app = express()
app.listen(8888, ()=>{console.log("Server is Connected to port!!");
})
app.use("/test",(req,res)=> {res.send("Hello From the server to port 8888")
})
app.use("/head",(req,res)=>{res.send("Head Page on port 8888")})
app.use("/",(req,res)=>{res.send("Main Page of port 8888")})