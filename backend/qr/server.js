// Dependencies
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// Init server
const server = express();

// Library middleware
server.use(cors(), helmet(), express.json());

// Used routes
const qrRouter = require("./controllers/qr");

// expose API endpoint
server.use("/api/qr", qrRouter);

server.get("/", (req, res) => {
  res.send("It works!");
});

module.exports = server;
