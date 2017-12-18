const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = require("./router");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:auth/auth");

app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));
app.use(router);

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server Listening");
