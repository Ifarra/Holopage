const fs = require("fs");

const sendIndex = (res) => {
  fs.readFile("./page/home.html", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error loading index.html");
    }

    res.send(data);
  });
};

module.exports = { sendIndex };
