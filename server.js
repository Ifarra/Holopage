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

app.get("/article/:numtalent/comment", (req, res) => {
  const { numtalent } = req.params;
  const { name, comment } = req.query;

  // Read the existing comments from the JSON file
  let comments = JSON.parse(fs.readFileSync("comments.json"));

  // Find the comment section based on the numtalent parameter
  const commentSection = comments.find(
    (section) => section.numtalent === numtalent
  );

  if (!commentSection) {
    // If the comment section doesn't exist, create a new one
    const newCommentSection = {
      numtalent,
      comments: [],
    };

    // Add the new comment section to the list of comments
    comments.push(newCommentSection);

    // Add the comment to the newly created comment section
    newCommentSection.comments.push({ name, comment });
  } else {
    // Add the comment to the existing comment section
    commentSection.comments.push({ name, comment });
  }

  // Save the updated comments back to the JSON file
  fs.writeFileSync("comments.json", JSON.stringify(comments));

  // Send the updated comments as the response
  res.redirect(`/article/${numtalent}`);
});

app.get("/article/:numtalent/comments", (req, res) => {
  const { numtalent } = req.params;

  // Read the comments from the JSON file
  const comments = JSON.parse(fs.readFileSync("comments.json"));

  // Filter the comments for the specific numtalent
  const filteredComments = comments.filter(
    (comment) => comment.numtalent === numtalent
  );

  // Send the filtered comments as JSON
  res.json(filteredComments);
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
