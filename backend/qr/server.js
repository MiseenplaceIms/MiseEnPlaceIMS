const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

server.use(cors(), helmet(), express.json());

module.exports = server;
