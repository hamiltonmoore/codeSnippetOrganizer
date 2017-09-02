const express = require('express');
const Snippet = require("../models/Snippet");
const indexRoutes = express.Router();

//displays all data/snippets from db 
indexRoutes.get("/", function (req, res) {
    console.log("this is a test for route /:")
    Snippet.find()
        .then(function (foundSnippet) {
            if (!foundSnippet) {
                return res.send({ msg: "No Snippets found" })
            }
            return res.render("home") //this passes data through { Snippet: foundSnippet });
        })
        .catch(function (err) {
            return res.status(500).send(err);
        })
})

//this posts new information in the database
indexRoutes.post("/newSnippet", function (req, res) {
    let newSnippet = new Snippet(req.body); //is this a method?? //what is an instance
    console.log("this is the array: ", newSnippet);
    newSnippet
        .save()
        .then(function (savedSnippet) { //.then returns a promise(something executed after something is finished)
            return res.redirect("/");  //can send data, just can't merge data and templetes like render can
        })
        .catch(function (err) {    //.catch returns errors 
            return res.status(500).send(err);
        })
});

// find specific languages
indexRoutes.get("/language/:id", function (req, res) {
    users.find({ language: { $ne: null } }).then((thatLanguage) => {
        if (!thatLanguage) {
            res.status(500).send("no snippets with that language");
            return res.render("home", { users: employedBots })
        }
    })
});

indexRoutes.post("/delete/:id", function (req, res) {
    User.findByIdAndRemove(req.params.id)
        .then(function () {
            res.redirect("/");
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

module.exports = indexRoutes;