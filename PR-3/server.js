let express = require("express");
let path = require("path");

let app = express();

// EJS set
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// ---------------- ROUTES ---------------- //

// Dashboard
app.get("/dashboard", (req, res) => {
    res.render("dashboard");
});

// Charts
app.get("/charts", (req, res) => {
    res.render("charts");
});

// Tables
app.get("/tables", (req, res) => {
    res.render("tables");
});

// Widgets
app.get("/widgets", (req, res) => {
    res.render("widgets");
});

// Forms (form-basic)
app.get("/form-basic", (req, res) => {
    res.render("form-basic");
});

// Login Page
app.get("/login", (req, res) => {
    res.render("login");
});

// Register Page
app.get("/register", (req, res) => {
    res.render("register");
});

// Invoice
app.get("/invoice", (req, res) => {
    res.render("invoice");
});

// Chat Page
app.get("/chat", (req, res) => {
    res.render("chat");
});

// Gallery
app.get("/gallery", (req, res) => {
    res.render("gallery");
});

// Grid
app.get("/grid", (req, res) => {
    res.render("grid");
});

// Pages Buttons
app.get("/pages-buttons", (req, res) => {
    res.render("pages-buttons");
});

// Default
app.get("/", (req, res) => {
    res.redirect("/dashboard");
});

// Server start
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});