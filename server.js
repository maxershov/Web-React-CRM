/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const express = require("express");
const history = require('connect-history-api-fallback');
const path = require("path");
const compression = require("compression");

const port = process.env.PORT || 8080;
const staticFiles = express.static(path.join(__dirname, "dist"));

const app = express();
app.use(staticFiles);
app.use(compression);
app.use(history());
app.listen(port);
app.use(staticFiles)
console.log(`App is listening on port ${port}`);
