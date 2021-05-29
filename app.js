"use strict";
const express = require("express");
const path=require("path")

const app = express();
const PORT = 3000;
let ticket = 0;
const displayList = {};

//var bodyParser = require('body-parser')
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '')));

app.get("/next", (req, res) => {
  //http://localhost:3000/next?tent=tent5
  const tent = req.query.tent;
  ticketIncrement();
  displayList[ticket] = tent;
  res.type('application/json')
  res.append('Access-Control-Allow-Origin', ['*']);
  res.send(JSON.stringify({ ticket }));
});

app.get("/display", (req, res) => {
  res.type('application/json')
  res.append('Access-Control-Allow-Origin', ['*']);
  res.send(JSON.stringify(displayList));
});

app.get("/present", (req, res) => {
  const ticket = req.query.ticket;
  delete displayList[ticket];
  res.type('application/json')
  res.append('Access-Control-Allow-Origin', ['*']);
  res.status(200).send(JSON.stringify("OK")); //Nick added stringify 01/21
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

const ticketIncrement = () => (ticket == 999 ? (ticket = 1) : ticket++);