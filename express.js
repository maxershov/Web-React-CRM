/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const express = require("express");
const history = require('connect-history-api-fallback');
const expressStaticGzip = require('express-static-gzip');
const path = require("path");
const myLocalHost = require("./host");

// const staticFiles = express.static(path.join(__dirname, "dist"));
const staticFiles = expressStaticGzip(path.join(__dirname, "dist"));

const app = express();
app.use(staticFiles);
app.use(history());
const port = 8080;
app.listen(port, myLocalHost.host);
app.use(staticFiles)
console.log(`App is listening on port ${port}`);
