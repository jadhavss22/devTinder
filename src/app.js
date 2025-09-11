const express = require("express");

const app = express();


// Only GET Calls to handle from /user, /user/asd, /user/1
app.get("/user/:userId", (req, res) => {
      console.log(req.params);
  res.send({ firstName: "Sarthak", techStack: "NodeJs" });
});

// Complex Routing Methods :
// '/ab?c' it will work on route '/ac' and '/abc' also wprks
// '/ab+c' it will only work on '/abbbc', '/abbc' but not in '/abcc' rotes.
// '/ab*cd' it will work on anything between ac and cd '/abfsdffgdfgdgcd'
// Group together and apply '/a(bc)?d' means 'bc' is optional not work on '/acd'
app.get("/abc", (req, res) => {
  res.send({ firstName: "Sarthak", techStack: "NodeJs" });
})

app.listen(8888, () => {
  console.log("Server is Connected to port!!");
});
