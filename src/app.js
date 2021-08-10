const express = require("express");
const app = express();
const validateZip = require("./middleware/validateZip");
const getZoos = require("./utils/getZoos");

app.get("/check/:zip", validateZip, (req, res, next) => {
  const zip = req.params.zip;
  if (getZoos(zip)) {
    res.send(`${zip} exists in our records.`);
  } else {
    res.send(`${zip} does not exist in our records.`);
  }
});

app.get("/zoos/all", (req, res, next) => {
  const admin = req.query.admin;
  if (admin === "true") {
    res.send(`All zoos: ${getZoos().join("; ")}`);
  } else {
    res.send("You do not have access to that route.");
  }
});

app.get("/zoos/:zip", validateZip, (req, res, next) => {
  const zip = req.params.zip;
  if (getZoos(zip).length === 0) {
    res.send(`${zip} has no zoos.`);
  } else {
    res.send(`${zip} zoos: ${getZoos(zip).join("; ")}`);
  }
});

// 404 handler
app.use((req, res, next) => {
  res.status(404);
  next("That route could not be found!");
});

// general error handler
app.use((err, req, res, next) => {
  res.send(err);
});

module.exports = app;
