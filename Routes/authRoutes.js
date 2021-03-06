const express = require("express");
const authRoutes = express.Router();
const User = require("./Users");
const bcrypt = require("bcryptjs");

//authorization on signup page// 
authRoutes.get("/signup", function (req, res) {
    res.render("signup");
})

authRoutes.post("/signup", function (req, res) {
    let newUser = new User(req.body);
    console.log('newUser: ', newUser);

    let salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(newUser.password, salt);
    newUser
        .save()
        .then(function (savedUser) {
            res.redirect("/auth/login")
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

authRoutes.get("/login", function (req, res) {
    return res.render("login");
})

authRoutes.post("/login", function (req, res) {
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
        console.log("this is found user:", foundUser);
        return res.redirect("/");
    });
});

authRoutes.post("/logout", function (req, res) {
    req.session.destroy()
    res.redirect("/");
})

module.exports = authRoutes; 