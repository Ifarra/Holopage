const express = require("express");
const fs = require("fs");
const app = express();
const indexpage = require("./index.js");
const talentpage = require("./talent.js");
const articlepage = require("./article.js");

app.get("/", (req, res) => {
  indexpage.sendIndex(res);
});

app.get("/talent", (req, res) => {
  talentpage.sendTalent(res);
});

app.get("/article", (req, res) => {
  articlepage.sendTalent(res);
});

app.get("/article/:numtalent", async (req, res) => {
  const numtalent = req.params.numtalent;
  articlepage.sendTalentdesc(res, numtalent);
});

app.get("/talent/:numtalent", async (req, res) => {
  const numtalent = req.params.numtalent;
  talentpage.sendTalentdesc(res, numtalent);
});

app.use("/public", express.static("public"));

const port = 3000; // Change the port number if needed

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
