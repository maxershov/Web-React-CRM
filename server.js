/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const express = require("express");
const history = require('connect-history-api-fallback');
const expressStaticGzip = require('express-static-gzip');
const helmet = require('helmet');
const path = require("path");

const port = process.env.PORT || 8080;
const staticFiles = expressStaticGzip(path.join(__dirname, "dist"));

const app = express();
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      fontSrc: [
        "'self'", // for fonts loaded using "@font-face"
        'https://fonts.gstatic.com'
      ],
      styleSrc: [
        "'self'",
        'https://fonts.googleapis.com'
      ],
    }
}));
app.use(staticFiles);
app.use(history());
app.listen(port);
app.use(staticFiles);
console.log(`App is listening on port ${port}`);