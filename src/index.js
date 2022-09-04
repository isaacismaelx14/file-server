const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(express.static("./public"));

app.get('/', async (req, res) => {
  //list all files on public folder
  try {
    const files = await fs.readdirSync(path.join(__dirname, "..", "public", "files"));
    const getLi = files.map((file, index) => {
      return `<tr><th scope="row">${index + 1}</th><td><a href="/files/${file}">${file}</a></td></tr>`;
    });

    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Server</title>
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
        crossorigin="anonymous"
      >

    </head>
    <body>
      <div class="container">
        <h1>List of files</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Filename</th>
            </tr>
          </thead>
          <tbody>
            ${getLi.join("")}
          </tbody>
        </table>
      </div>
    </body>
    </html>
  `);
    
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`App runing on: http://localhost:${PORT}`);
});