const fs = require("fs");

function sendTalent(res) {
  var comicFolder = "./public/HolopageArticle/";
  fs.readdir(comicFolder, (err, folders) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading image folder");
    }

    const divs = folders
      .filter((folder) => folder.startsWith("berita"))
      .sort((a, b) => {
        const suffixA = parseInt(a.replace(/^berita/, ""));
        const suffixB = parseInt(b.replace(/^berita/, ""));
        return suffixA - suffixB;
      })
      .map((folder) => {
        const folderPath = comicFolder + folder + "/";
        let imgFile, txtFile;
        try {
          const files = fs.readdirSync(folderPath);
          imgFile = files.find((file) => /\.(png|jpe?g|webp)$/i.test(file));
          txtFile = files.find((file) => file.endsWith(".txt"));

          if (imgFile && txtFile) {
            const data = fs.readFileSync(folderPath + txtFile, "utf-8");
            const suffix = folder.replace(/^berita/, "");
            const imgUrl = `/public/HolopageArticle/${folder}/${imgFile}`;
            const title = txtFile.replace(/\.txt$/, "");
            const content =
              data.substring(0, 70).replace(/\n/g, "<br/>") +
              (data.length > 70 ? "..." : "");

            return `<div class="blog-entry d-flex flex-column flex-md-row blog-entry-search-item">
              <a href="single.html" class="img-link me-4">
                <div style="width: 250px;">
  <img src="${imgUrl}" alt="Article Image" style="width: 100%; height: auto;">
</div>
              </a>
              <div>
                <span class="date">Apr. ${suffix}, 2024</span>
                <h2><a href="/article/${folder}">${title}</a></h2>
                <p>${content}</p>
                <p><a href="/article/${folder}" class="btn btn-sm btn-outline-primary">Read More</a></p>
              </div>
            </div>`;
          }
        } catch (err) {
          console.error(err);
          return res.status(500).send("Error reading article folder");
        }
      })
      .join("");
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
            <title>Holopage : Talent</title>
            <link rel="stylesheet" href="/public/css/style.css">
            	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
		integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="/public/css/talent.css">
              <link rel="apple-touch-icon" sizes="180x180" href="/public/favicon_io/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/public/favicon_io/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/public/favicon_io/favicon-16x16.png">
  <link rel="manifest" href="/public/favicon_io/site.webmanifest">
        </head>
        <body style="background: url('/public/img/common_bg.svg');
            background-repeat: no-repeat;
            background-position: center center;
            background-attachment: fixed;
            background-size: cover;
            width: 100%;
            height: 100vh;
            ">
<nav class="navbar fixed-top navbar-expand-lg" style="background-color: #fff; z-index: 1112;">
    <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center NewArrival__header--title" id="main_nav">
            <ul class="navbar-nav ms-1 me-1 pacifico " style="gap: 15px;">
                <li class="nav-item"><a class="nav-link text-center" href="#"> - Article - </a></li>
                <li class="nav-item"><a class="nav-link text-center" href="/"> - Home - </a></li>
                <li class="nav-item"><a class="nav-link text-center" href="/talent"> - Talent - </a></li>
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


        <section class="pb-5" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-top: 80px;">
    <div class="section search-result-wrap">
      <div class="container">

        <div class="row posts-entry justify-content-center">
          <div class="col-8 col-md-10 col-lg-10">
          ${divs}
                  
          </div>


        </div>
      </div>
    </div>
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
  const prefix = "berita";
  const comicFolder = "./public/HolopageArticle/";
  const [, suffix] = numtalent.split(prefix);
  const folder = `${prefix}${suffix}`;

  fs.readdir(comicFolder + folder, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading image folder");
    }

    const imgFile = files.find((file) => /\.(png|jpe?g|webp)$/i.test(file));
    const txtFile = files.find((file) => file.endsWith(".txt"));

    if (!imgFile || !txtFile) {
      return res.status(404).send(`${imgFile} or ${txtFile} not found`);
    }

    const data = fs.readFileSync(comicFolder + folder + "/" + txtFile, "utf-8");
    const imgUrl = `/public/HolopageArticle/${folder}/${imgFile}`;
    const title = txtFile.replace(/\.txt$/, "");
    const content = data.replace(/\n/g, "<br/>");

    const html = `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Holopage-Talent : ${numtalent}</title>
                    <link rel="stylesheet" href="/public/css/talent.css">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
		integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <link rel="apple-touch-icon" sizes="180x180" href="/public/favicon_io/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/public/favicon_io/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/public/favicon_io/favicon-16x16.png">
  <link rel="manifest" href="/public/favicon_io/site.webmanifest">
                </head>
                <body style="background: url('/public/img/common_bg.svg');
            background-repeat: no-repeat;
            background-position: center center;
            background-attachment: fixed;
            background-size: cover;
            width: 100%;
            height: 100vh;">

<nav class="navbar fixed-top navbar-expand-lg" style="background-color: #fff; z-index: 1112;">
    <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center NewArrival__header--title" id="main_nav">
            <ul class="navbar-nav ms-1 me-1 pacifico " style="gap: 15px;">
                <li class="nav-item"><a class="nav-link text-center" href="/article"> - Article - </a></li>
                <li class="nav-item"><a class="nav-link text-center" href="/"> - Home - </a></li>
                <li class="nav-item"><a class="nav-link text-center" href="/talent"> - Talent - </a></li>
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

                    <main style="padding-top: 80px;">
                        <div class="blog-entry d-flex flex-column blog-entry-search-item justify-content-center align-items-center">
                        <div class="col-md-9">
                          <a href="" class="d-flex justify-content-center">
                            <div class="img-fluid">
                              <img src="${imgUrl}" alt="Article Image" style="width: 100%; height: auto;">
                            </div>
                          </a>
                          <div class="col-12 p-4">
                            <span class="date">Apr. ${suffix}, 2024</span>
                            <h1><a href="/article/${folder}">${title}</a></h1>
                            <p class="text-break">${content}</p>
                            <p><a href="/article" class="btn btn-sm btn-outline-primary">Back</a></p>
                          </div>
                          </div>
                        </div>

                          <div class="container col-9 pb-5">
    <h1>Comment Form</h1>

    <form action="http://localhost:3000/article/${folder}/comment" method="get">
  <div class="form-group">
    <label for="name">Name:</label>
    <input type="text" class="form-control" id="name" name="name" required>
  </div>

  <div class="form-group">
    <label for="comment">Comment:</label>
    <textarea class="form-control" id="comment" name="comment" required></textarea>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>

<ul id="commentsList" class="list-group pt-3" style="gap: 10px"></ul>


 <script>
  // Sample JSON data
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/article/${folder}/comments', false);
  xhr.send();
  const jsonData = JSON.parse(xhr.responseText);

  // Get the commentsList element
  const commentsList = document.getElementById('commentsList');

  // Loop through the comments array
  jsonData.forEach(item => {
    const comments = item.comments;

    // Loop through the comments and generate <li> elements
    comments.forEach(comment => {
      const listItem = document.createElement('li');
      listItem.innerHTML = '<strong>Name:</strong> ' + comment.name + '<br><strong>Comment:</strong> ' + comment.comment;
      commentsList.appendChild(listItem);
    });
  });
</script>
  </div>

                         <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
		crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
		integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g=="
		crossorigin="anonymous" referrerpolicy="no-referrer"></script>
                    </main>
                </body>
            `;

    res.send(html);
  });
}

module.exports = { sendTalent, sendTalentdesc };
