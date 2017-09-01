const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const session = require("express-session")
const mustacheExpress = require("mustache-express");
const bcrypt = require("bcryptjs");
const users = require("./models/users");
const sessionConfig = require("./sessionConfig");
const bluebird = require("bluebird"); //allows you to do the .thens etc 
const dbUrl = "mongodb://localhost:27017/codeSnippetOrganizer";
mongoose.Promise = bluebird;
let db = mongoose.connect(dbUrl);
const mongo = require("mongodb");
const port = process.env.PORT || 8100

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(session(sessionConfig));
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

