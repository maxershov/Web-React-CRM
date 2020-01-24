// eslint-disable-next-line import/no-extraneous-dependencies
const express = require("express");
const path = require("path");
const myLocalHost = require("./host");

const app = express();
app.use(express.static(path.join(__dirname, "dist")));

const port = 8080;
app.listen(port, myLocalHost.host);

console.log(`App is listening on port ${port}`);
