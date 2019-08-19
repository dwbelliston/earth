"use strict";
const fs = require("fs");
const express = require("express");
var cors = require("cors");

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

// App
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world\n");
});

app.get("/stories", (req, res) => {

  fs.readFile("mocks/stories.json", (err, data) => {
    if (err) throw err;
    res.send(JSON.parse(data));
  });

});

app.get("/stories/:id", (req, res) => {

  console.log('ID')

  fs.readFile("mocks/stories.1.json", (err, data) => {
    if (err) throw err;
    res.send(JSON.parse(data));
  });

});

app.post("/stories", (req, res) => {

  fs.readFile("mocks/stories.json", (err, data) => {
    if (err) throw err;
    res.send(JSON.parse(data[0]));
  });
});



app.listen(PORT, HOST);
console.log(`Local up on http://${HOST}:${PORT}`);
