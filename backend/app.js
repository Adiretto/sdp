const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("user hit the resource");
  res.status(200).send("Home Page");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
