const express = require('express');
const Snippet = require("../models/Snippet");
const indexRoutes = express.Router();

//displays all data/snippets from db 
indexRoutes.get("/", function (req, res) {
    Snippet.find()
        .then(function (foundSnippet) {
            if (!foundSnippet) {
                return res.send({ msg: "No Snippets found" })
            }
            return res.render("home", { user: req.session.user, Snippet: foundSnippet })
        })
        .catch(function (err) {
            return res.status(500).send(err);
        })
})

indexRoutes.get("/viewSnippet/:id", function (req, res) {
    Snippet.findById(req.params.id)
        .then(function (foundSnippet) {
            if (!foundSnippet) {
                return res.send({ msg: "No Snippet Found" })  //note the absence of plurality 
            }
            res.render("view", { Snippet: foundSnippet })
        })
        .catch(function (err) {
            res.status(500).send(err);
        })
});

indexRoutes.get("/newSnippet", function (req, res) {
    return res.render("newSnippet")
});

//this posts new information in the database
indexRoutes.post("/createSnippet", function (req, res) {
    let newSnippet = new Snippet(req.body); //is this a method?? //what is an instance
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
            return res.render("home")
        }
    })
});

indexRoutes.post("/delete/:id", function (req, res) {
    Snippet.findByIdAndRemove(req.params.id)
        .then(function () {
            res.redirect("/");
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});
indexRoutes.post("/updateSnippet/:id", function (req, res) {
    if (!req.body.job) {
        req.body.job = null;
    }

    Snippet.findByIdAndUpdate(req.params.id, req.body)
        .then(function (updatedSnippet) {
            if (!updatedSnippet) {
                return res.send({ msg: "could not update Snippet" });
            }
            res.redirect("/");
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

indexRoutes.get("/:language", function (req, res) {
    Snippet.find({ language: req.params.language })
        .then((foundLanguage) => {
            if (!foundLanguage) res.status(500).send(`no ${req.params.language} snippets`);
            return res.render("home", { user: req.session.user, Snippet: foundLanguage })
        });
});

indexRoutes.post("/tag", function (req, res) {
    Snippet.find({ tag: req.body.tag })
        .then((foundTag) => {
            if (!foundTag) res.status(500).send(`No snippets by the ${req.body.tag} tag`);
            return res.render("home", { user: req.session.user, Snippet: foundTag })
        })
})

module.exports = indexRoutes;