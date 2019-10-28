const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const port = 5000;
const routeIndex = require("./src/routes/index.js");

/* const authConfig = require('./config/auth0.json'); */

// Set up Auth0 configuration
const authConfig = {
  domain: "godseye.eu.auth0.com",
  audience: "http://localhost:5000/"
};

// Define middleware that validates incoming bearer tokens
// using JWKS from antonauth.eu.auth0.com
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"]
});


app.use(cors());
app.use("/", checkJwt, routeIndex);

app.listen(port, () => console.log(`Listening on port ${port}!`))