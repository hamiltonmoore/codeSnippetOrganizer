const express = require('express');
const User = require("../models/Users");
const checkAuth = express.Router();

module.exports = (req, res, next) => {
    if (req.session.User) {
        next();
    } else {
        res.redirect("/login");
    }
};