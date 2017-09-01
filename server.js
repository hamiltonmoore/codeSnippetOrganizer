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


//authorization on signup page// 
app.get("/signup", function (req, res) {
    res.render("signup");
})

app.post("/signup", function (req, res) {
    let newUser = new User(req.body);
    let salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(newUser.password, salt);
    newUser
        .save()
        .then(function (savedUser) {
            res.redirect("/login")
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

//signin - password check
app.get("/login", function (req, res) {
    res.render("login");
})

app.post("/login", function (req, res) {
    let reqUsername = req.body.username;
    let reqPassword = req.body.password;

    User.findOne({ username: reqUsername }).then(function (foundUser) {
        if (!foundUser) {
            return res.render("login", { errors: ["No user found."] });
        }

        const authorized = bcrypt.compareSync(reqPassword, foundUser.password);

        if (!authorized) {
            return res.render("login", { errors: ["Password does not match."] });
        }

        delete foundUser.password;
        req.session.user = foundUser;
        return res.redirect("/");
    });
});


//this posts new information in the database
app.post("/profile", function (req, res) {
    let newUser = new User(req.body); //is this a method?? //what is an instance
    console.log("this is the array: ", newUser);
    newUser
        .save()
        .then(function (savedUser) { //.then returns a promise(something executed after something is finished)
            return res.redirect("/");  //can send data, just can't merge data and templetes like render can
        })
        .catch(function (err) {    //.catch returns errors 
            return res.status(500).send(err);
        })


    //find specific languages
    app.get("/language/:id", function (req, res) {
        users.find({ language: { $ne: null } }).then((thatLanguage) => {
            if (!thatLanguage) {
                res.status(500).send("no snippets with that language");
                return res.render("home", { users: employedBots })
            }
        })
    });
})

//delete a snipppet 
app.post("/delete/:id", function (req, res) {
    User.findByIdAndRemove(req.params.id)
        .then(function () {
            res.redirect("/");
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

app.listen(port, function () {
    console.log(`server is running on port ${port}!`);
});