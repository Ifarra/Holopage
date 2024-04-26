const express = require("express");
const fs = require("fs");
const app = express();
const indexpage = require("./index.js");

app.get("/", (req, res) => {
  indexpage.sendIndex(res);
});

app.use("/public", express.static("public"));

const port = 3000; // Change the port number if needed

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
