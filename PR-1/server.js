let http = require("http");
let fs = require("fs");
let path = require("path");

let server = http.createServer((req, res) => {
  let filePath;
  let route = req.url.toLowerCase();

  switch (route) {
    case "/":
      filePath = path.join(__dirname, "home.html");
      break;

    case "/about":
      filePath = path.join(__dirname, "about.html");
      break;

    case "/contact":
      filePath = path.join(__dirname, "contact.html");
      break;

    default:
      res.writeHead(404, { "Content-Type": "text/html"});
      res.end("<h1>404 Page Not Found</h1>");
      return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>Server Error</h1>");
    } else {
      
      if (route !== "/app.css") {
        res.writeHead(200, { "Content-Type": "text/html" });
      }
      res.end(data);
    }
  });
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});