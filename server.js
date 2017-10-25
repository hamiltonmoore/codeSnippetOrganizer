const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const session = require("express-session");
const mustacheExpress = require("mustache-express");
const bcrypt = require("bcryptjs");
const sessionConfig = require("./sessionConfig");
const bluebird = require("bluebird"); //allows you to do the .thens etc 

const indexRoutes = require("./Routes/indexRoutes");
const authRoutes = require("./Routes/authRoutes");
const User = require("./models/Users");
const Snippet = require("./models/Snippet");


const dbUrl = "mongodb://localhost:27017/codeSnippetOrganizer";
mongoose.Promise = bluebird;
let db = mongoose.connect(MONGODB_URI || dbUrl);
const port = process.env.PORT || 8000

const app = express();

//templating engine
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

//middleware
app.use(session(sessionConfig));
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

//routes
app.use("/", indexRoutes);
app.use("/auth", authRoutes);

app.listen(port, function () {
    console.log(`server is running on port ${port}!`);
});