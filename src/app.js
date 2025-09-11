const express = require("express");

const app = express();

// All API Methods give same result due to order of code.
app.use("/user", (req, res) => {
  res.send("Order plays important role");
});

// Only GET Calls to handle from /user
app.get("/user", (req, res) => {
  res.send({ firstName: "Sarthak", techStack: "NodeJs" });
});

//  Only Post Call to handle from /user

app.post("/user", (req, res) => {
  res.send({ status: "200 OK", Data: "Saved Successfully!!" });
});


app.listen(8888, () => {
  console.log("Server is Connected to port!!");
});


app.use("/test", (req, res) => {
  res.send("Hello From the server to port 8888");
});
app.use("/", (req, res) => {
  res.send("Main Page of port 8888");
});

