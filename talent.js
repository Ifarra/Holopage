const fs = require("fs");

function sendTalent(res) {
  var comicFolder = "./public/HolopageTalent/";
  fs.readdir(comicFolder, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading image folder");
    }

    const divs = files
      .filter(
        (file) =>
          file.endsWith(".jpg") ||
          file.endsWith(".png") ||
          file.endsWith(".webp")
      ) // Adjust the file extensions as per your requirement
      .sort((a, b) => {
        const fileA = a.replace(/\.(.*)$/, "").toLowerCase();
        const fileB = b.replace(/\.(.*)$/, "").toLowerCase();
        if (fileA < fileB) {
          return -1;
        }
        if (fileA > fileB) {
          return 1;
        }
        return 0;
      })
      .map(
        (file) => `<div class="carddisplay pacifico">
  <a href="/talent/${file.replace(/\.(.*)$/, "").replace(/_/g, " ")}">
  <div class="bgcarddisplay" style="background: url('/public/HolopageTalent/${file}')">
    <p>${file.replace(/\.(.*)$/, "").replace(/_/g, " ")}</p>
  </div>
  </a>
  <div class="blobcarddisplay"></div>
</div>`
      )
      .join("");
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
            <title>Holopage : Talent</title>
            <link rel="stylesheet" href="/public/css/talent.css">
            	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
		integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
        
	<nav class="navbar fixed-top navbar-expand-lg" style="background-color: #fff; z-index: 1112;">
    <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center NewArrival__header--title" id="main_nav">
            <ul class="navbar-nav ms-1 me-1 pacifico " style="gap: 15px;">
                <li class="nav-item"><a class="nav-link text-center" href="/article"> - Article - </a></li>
                <li class="nav-item"><a class="nav-link text-center" href="/"> - Home - </a></li>
                <li class="nav-item"><a class="nav-link text-center" href="#"> - Talent - </a></li>
            </ul>
        </div>
    </div>
    <style>
        .navbar-nav li a {
            text-decoration: none;
        }

        .navbar-nav li a:hover {
            text-decoration: underline;
        }
    </style>
</nav>


    <div style="
        display: block;
        height: 20px;
        width: 100%;
      "></div>


            <section class="pt-5 pb-5" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px;">
          ${divs}
            </section>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
		crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
		integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g=="
		crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        </body>
      </html>
    `;

    res.send(html);
  });
}

function sendTalentdesc(res, numtalent) {
  var comicFolder = "./public/HolopageDesc/";
  var imgFolder = "./public/HolopageTalent/";

  fs.readdir(imgFolder, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading image folder");
    }

    const targetFile = files.find((file) => file === `${numtalent}.png`);

    if (!targetFile) {
      return res.status(404).send(targetFile + " not found");
    }
  });

  fs.readdir(comicFolder, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading image folder");
    }

    const targetFile = files.find((file) => file === `${numtalent}.txt`);

    if (!targetFile) {
      return res.status(404).send(targetFile + " not found");
    }

    fs.readFile(comicFolder + targetFile, "utf-8", (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error reading file");
      }

      data = data.replace(/\n/g, "<br/>");
      const html = `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Holopage-Talent : ${numtalent}</title>
                    <link rel="stylesheet" href="/public/css/talent.css">
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body>
                    <main>
                        ${data}
                    </main>
                </body>
            `;

      res.send(html);
    });
  });
}

module.exports = { sendTalent, sendTalentdesc };
