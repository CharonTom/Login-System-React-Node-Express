const express = require("express");
const app = express();
require("dotenv").config();

app.get("/", (req, res) => {
  res.json({ message: "Hello World from the app" });
});

module.exports = app;