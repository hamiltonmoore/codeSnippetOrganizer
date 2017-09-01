const express = require("express");
const loginSignupRoutes = express.Router();

//authorization on signup page// 
loginSignupRoutes.get("/signup", function (req, res) {
    res.render("signup");
})

loginSignupRoutes.post("/signup", function (req, res) {
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
loginSignupRoutes.get("/login", function (req, res) {
    res.render("login");
})

loginSignupRoutes.post("/login", function (req, res) {
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

module.exports = loginSignupRoutes; 