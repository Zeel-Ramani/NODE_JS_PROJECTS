
const express = require('express');
const port = process.env.PORT || 9005;
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require("connect-flash");
require("dotenv").config();

const dbconnection = require('./config/dbconnection');
const flashConnect = require("./config/flashConnect");

const app = express();
dbconnection();

app.set("view engine", "ejs");

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    name: 'test',
    secret: 'admin',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.userData = req.user || null;
    next();
});

app.use(flashConnect.setFlash);

app.use("/", require('./routes/index.routes'));

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
