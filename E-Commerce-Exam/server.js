const express = require('express');
const port = 8005;
const app = express();

const dbconnection = require('./config/db');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require("cookie-parser");

app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use('/', require('./routes/index.routes'));

dbconnection();

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
