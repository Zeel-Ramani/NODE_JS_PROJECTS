let http = require("http");

let homePage = `
  <html>
    <head><title>Home</title></head>
    <body style="font-family: Arial; text-align:center;">
      <a href="/about" style="margin-right:20px;">About</a>
      <a href="/contact">Contact</a>
      <h1 style="color:blue;">Welcome to Home Page</h1>
      <a href="/" style="margin-right:20px;">Home</a>
    </body>
  </html>
`;

let aboutPage = `
  <html>
    <head><title>About</title></head>
    <body style="font-family: Arial; text-align:center;">
      <a href="/" style="margin-right:20px;">Home</a>
      <a href="/about" style="margin-right:20px;">About</a>
      <a href="/contact">Contact</a>
      <h1 style="color:green;">About Us</h1>
      <p>We are learning Node.js server development.</p>
    </body>
  </html>
`;

let contactPage = `
  <html>
    <head><title>Contact</title></head>
    <body style="font-family: Arial; text-align:center;">
      <a href="/" style="margin-right:20px;">Home</a>
      <a href="/about" style="margin-right:20px;">About</a>
      <a href="/contact">Contact</a>
      <h1 style="color:purple;">Contact Us</h1>
      <p>Email: example@gmail.com</p>
    </body>
  </html>
`;

let server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end(homePage);
  } else if (req.url === "/about") {
    res.end(aboutPage);
  } else if (req.url === "/contact") {
    res.end(contactPage);
  } else {
    res.end("<h1>404 Page Not Found</h1>");
  }
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});