const express = require('express');
const app = express();
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const colors = require('colors');
const dotenv = require("dotenv");
const bodyParser = require("body-parser");


const olympicRoute = require('./routes/olympicRoute')

const helmet = require('helmet');
app.use(helmet());

app.use(express.static('public'));

dotenv.config({ path: "/.env" });

app.use(bodyParser.json({ limit: "1000mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "1000mb", extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));

app.use("/olympic", olympicRoute)

const hostName = process.env.HOST_NAME || "localhost";
const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server running at ${hostName}:${port}/`.yellow);
});